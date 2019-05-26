package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.PublishingHouseRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class PublishingHouseController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem,
                                          publishingHouseRepository: PublishingHouseRepository)
                                         (implicit exec: ExecutionContext) extends AbstractController(cc) {

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

  def addPublishingHouse = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
}

  def deletePublishingHouse(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def editPublishingHouse(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
