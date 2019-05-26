package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.AdminRepository
import play.api.mvc._
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext

@Singleton
class AdminController @Inject()(cc: ControllerComponents, adminRepository: AdminRepository, actorSystem: ActorSystem)
                               (implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllAdmins = Action.async { implicit request =>
    adminRepository
      .list()
      .map { books =>
        Ok(Json.toJson(books))
      }
  }

  def addAdmin = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def editAdmin(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def deleteAdmin(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
