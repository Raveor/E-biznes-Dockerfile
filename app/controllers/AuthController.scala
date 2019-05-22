package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class AuthController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def login = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def register = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def logout = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
