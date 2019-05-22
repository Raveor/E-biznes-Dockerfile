package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class AdminController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllAdmins = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def addAdmin = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def editAdmin(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def deleteAdmin(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
