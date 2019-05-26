package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class AuthController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def login = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def register = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def logout = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
