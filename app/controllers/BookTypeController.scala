package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.{BookRepository, BookTypeRepository}
import play.api.libs.json.{JsObject, Json}
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class BookTypeController @Inject()(cc: ControllerComponents, bookTypeRepository: BookTypeRepository, actorSystem: ActorSystem)
                                  (implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllTypes = Action.async { implicit request =>
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
    val body : JsObject = request.body.asJson.get("bookType").as[JsObject]

    bookTypeRepository.insert(body.value("name").as[String])
      .map(bookType => Ok(Json.toJson(bookType)))
  }

  def deleteType(id: Integer) = Action.async {
    bookTypeRepository.delete(id).map(bookType => Ok(Json.toJson(bookType)))
  }

  def editType(id: Integer) = Action.async { implicit request =>
    val body : JsObject = request.body.asJson.get("bookType").as[JsObject]

    bookTypeRepository.edit(id, body.value("name").as[String])
      .map(bookType => Ok(Json.toJson(bookType)))
  }
}
