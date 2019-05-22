package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future, Promise}

@Singleton
class ClientController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllClients = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def getClientById(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def editClient(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
