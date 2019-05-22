package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class PublishingHouseController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllPublishingHouse = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def getPublishingHouseById(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def addPublishingHouse = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def deletePublishingHouse(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def editPublishingHouse(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
