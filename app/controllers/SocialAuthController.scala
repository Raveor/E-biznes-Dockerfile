package controllers

import javax.inject.Inject
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.impl.providers._
import models.ClientRepository
import models.services.UserService
import play.api.i18n.{ I18nSupport, Messages }
import play.api.mvc.{ AbstractController, AnyContent, ControllerComponents, Request }
import utils.auth.DefaultEnv

import scala.concurrent.{ ExecutionContext, Future }

class SocialAuthController @Inject() (
                                       components: ControllerComponents,
                                       silhouette: Silhouette[DefaultEnv],
                                       userService: UserService,
                                       authInfoRepository: AuthInfoRepository,
                                       socialProviderRegistry: SocialProviderRegistry,
                                       clientRepository: ClientRepository
                                     )(
                                       implicit
                                       ex: ExecutionContext
                                     ) extends AbstractController(components) with I18nSupport with Logger {

  def authenticate(provider: String) = Action.async { implicit request: Request[AnyContent] =>
    (socialProviderRegistry.get[SocialProvider](provider) match {
      case Some(p: SocialProvider with CommonSocialProfileBuilder) =>
        p.authenticate()
          .flatMap {
            case Left(result) => Future.successful(result)
            case Right(authInfo) => {
              for {
                profile <- p.retrieveProfile(authInfo)
                user <- {
                    clientRepository
                      .getByProvider(profile.loginInfo.providerID, profile.loginInfo.providerKey)
                      .map(
                        clients =>
                          if (clients.isEmpty) {
                            if(profile.loginInfo.providerID == "facebook") {
                              clientRepository.create(profile.firstName.get + " " + profile.lastName.get, profile.email.get, null, profile.loginInfo.providerKey, false)
                            } else {
                              clientRepository.create(profile.firstName.get + " " + profile.lastName.get, profile.email.get, profile.loginInfo.providerKey, null, false)
                            }
                          }
                      )
                  userService.save(profile)
                }
                authInfo <- authInfoRepository.save(profile.loginInfo, authInfo)
                authenticator <- silhouette.env.authenticatorService.create(profile.loginInfo)
                value <- silhouette.env.authenticatorService.init(authenticator)
                result <- {
                  val redirectUrl = "http://localhost:3000/?token=" + value
                  silhouette.env.authenticatorService.embed(value, Redirect(redirectUrl))
                }
              } yield {
                silhouette.env.eventBus.publish(LoginEvent(user, request))
                result
              }
            }
          }
      case _ => {
        Future.failed(new ProviderException(s"Cannot authenticate with unexpected social provider $provider"))
      }
    })
      .recover {
        case e: ProviderException =>
          logger.error("Unexpected provider error", e)
          Redirect("/error")
      }
  }
}
