package controllers

import akka.actor.ActorSystem
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import javax.inject._
import models.AuthorRepository
import org.webjars.play.WebJarsUtil
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future, Promise }

@Singleton
class AuthorController @Inject() (cc: MessagesControllerComponents, silhouette: Silhouette[DefaultEnv], authorRepository: AuthorRepository)(implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder, exec: ExecutionContext) extends AbstractController(cc) with LegacyI18nSupport {

  def getAllAuthors = silhouette.UnsecuredAction.async { implicit request =>
    authorRepository
      .list()
      .map(authors => Ok(Json.toJson(authors)).withHeaders("Access-Control-Allow-Origin" -> "*"))
  }

  def getAuthorById(id: Integer) = silhouette.UnsecuredAction.async { implicit request =>
    authorRepository
      .getById(id)
      .map(author => Ok(Json.toJson(author)))
  }

  def addAuthor = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    val body: JsObject = request.body.asJson.get("author").as[JsObject]

    authorRepository.insert(body.value("name").as[String], body.value("surname").as[String])
      .map(author => Ok(Json.toJson(author)))
  }

  def deleteAuthor(id: Integer) = silhouette.SecuredAction.async {
    authorRepository.delete(id).map(authors => Ok(Json.toJson(authors)))
  }

  def editAuthor(id: Integer) = silhouette.SecuredAction.async { implicit request =>
    val body: JsObject = request.body.asJson.get("author").as[JsObject]

    authorRepository.edit(id, body.value("name").as[String], body.value("surname").as[String])
      .map(author => Ok(Json.toJson(author)))
  }

}
