package controllers

import akka.actor.ActorSystem
import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models.ClientRepository
import org.webjars.play.WebJarsUtil
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future, Promise }

@Singleton
class ClientController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv],
  clientRepository: ClientRepository, actorSystem: ActorSystem)(implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder, exec: ExecutionContext
) extends AbstractController(cc) {

  def getAllUsers = silhouette.SecuredAction.async { implicit request =>
    clientRepository
      .list()
      .map(clients => Ok(Json.toJson(clients)))
  }

  def getUserById(id: Integer) = silhouette.SecuredAction.async { implicit request =>
    clientRepository
      .getById(id)
      .map(client => Ok(Json.toJson(client)))
  }

  def editUser(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
