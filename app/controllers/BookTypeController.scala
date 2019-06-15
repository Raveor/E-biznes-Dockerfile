package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.{ BookTypeRepository }
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc._
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import org.webjars.play.WebJarsUtil
import utils.auth.DefaultEnv

import scala.concurrent.ExecutionContext

@Singleton
class BookTypeController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv],
  bookTypeRepository: BookTypeRepository, actorSystem: ActorSystem)(
  implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder, exec: ExecutionContext
) extends AbstractController(cc) {

  def getAllTypes = silhouette.UnsecuredAction.async { implicit request =>
    bookTypeRepository
      .list()
      .map { types =>
        Ok(Json.toJson(types))
      }
  }

  def getTypeById(id: Integer) = Action.async { implicit request =>
    bookTypeRepository
      .getById(id)
      .map(t => Ok(Json.toJson(t)))
  }

  def addType = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("bookType").as[JsObject]

    bookTypeRepository.insert(body.value("name").as[String])
      .map(bookType => Ok(Json.toJson(bookType)))
  }

  def deleteType(id: Integer) = Action.async {
    bookTypeRepository.delete(id).map(bookType => Ok(Json.toJson(bookType)))
  }

  def editType(id: Integer) = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("bookType").as[JsObject]

    bookTypeRepository.edit(id, body.value("name").as[String])
      .map(bookType => Ok(Json.toJson(bookType)))
  }
}
