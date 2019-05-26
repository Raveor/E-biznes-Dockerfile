package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.ClientRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future, Promise}

@Singleton
class ClientController @Inject()(cc: ControllerComponents, clientRepository: ClientRepository, actorSystem: ActorSystem)
                                (implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllClients = Action.async { implicit request =>
    clientRepository
      .list()
      .map(clients => Ok(Json.toJson(clients)))
  }

  def getClientById(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def editClient(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
