package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.PublishingHouseRepository
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class PublishingHouseController @Inject() (cc: ControllerComponents, actorSystem: ActorSystem,
  publishingHouseRepository: PublishingHouseRepository)(implicit exec: ExecutionContext) extends AbstractController(cc) with LegacyI18nSupport {

  def getAllPublishingHouse = Action.async { implicit request =>
    publishingHouseRepository
      .list()
      .map(publishingHouses => Ok(Json.toJson(publishingHouses)))
  }

  def getPublishingHouseById(id: Integer) = Action.async { implicit request =>
    publishingHouseRepository
      .getById(id)
      .map(publishingHouse => Ok(Json.toJson(publishingHouse)))
  }

  def addPublishingHouse = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("publishingHouse").as[JsObject]

    publishingHouseRepository.insert(body.value("name").as[String])
      .map(author => Ok(Json.toJson(author)))
  }

  def deletePublishingHouse(id: Integer) = Action.async {
    publishingHouseRepository.delete(id).map(publishingHouse => Ok(Json.toJson(publishingHouse)))
  }

  def editPublishingHouse(id: Integer) = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("publishingHouse").as[JsObject]

    publishingHouseRepository.edit(id, body.value("name").as[String])
      .map(author => Ok(Json.toJson(author)))
  }
}
