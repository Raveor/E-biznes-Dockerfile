package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.AuthorRepository
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc._

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future, Promise }

@Singleton
class AuthorController @Inject() (cc: MessagesControllerComponents, authorRepository: AuthorRepository)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllAuthors = Action.async { implicit request =>
    authorRepository
      .list()
      .map(authors => Ok(Json.toJson(authors)))
  }

  def getAuthorById(id: Integer) = Action.async { implicit request =>
    authorRepository
      .getById(id)
      .map(author => Ok(Json.toJson(author)))
  }

  def addAuthor = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("author").as[JsObject]

    authorRepository.insert(body.value("name").as[String], body.value("surname").as[String])
      .map(author => Ok(Json.toJson(author)))
  }

  def deleteAuthor(id: Integer) = Action.async {
    authorRepository.delete(id).map(authors => Ok(Json.toJson(authors)))
  }

  def editAuthor(id: Integer) = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("author").as[JsObject]

    authorRepository.edit(id, body.value("name").as[String], body.value("surname").as[String])
      .map(author => Ok(Json.toJson(author)))
  }

}
