package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.BookRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class BooksController @Inject()(cc: ControllerComponents, bookRepository: BookRepository, actorSystem: ActorSystem)
                               (implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllBooks = Action.async { implicit request =>
    bookRepository
      .list()
      .map { books =>
        Ok(Json.toJson(books))
      }
  }

  def getBookById(id: Integer) = Action.async { implicit request =>
    bookRepository
      .getById(id)
      .map(book => Ok(Json.toJson(book)))
  }

  def addBook = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def deleteBook(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def editBook(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
