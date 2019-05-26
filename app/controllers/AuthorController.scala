package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.AuthorRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future, Promise}


@Singleton
class AuthorController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem, authorRepository: AuthorRepository)
                                (implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllAuthors = Action.async { implicit request =>
    authorRepository
      .list()
      .map( authors => Ok(Json.toJson(authors)))
  }

  def getAuthorById(id: Integer) = Action.async { implicit request =>
    authorRepository
      .getById(id)
      .map(author => Ok(Json.toJson(author)))
  }

  def addAuthor = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def deleteAuthor(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def editAuthor(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
