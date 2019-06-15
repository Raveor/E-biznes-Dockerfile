package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.BookRepository
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class BooksController @Inject() (cc: ControllerComponents, bookRepository: BookRepository, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

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
  //id: Int, title: String, author:Int, publishingHouse: Int, publishYear: Int, description: String, price: Float, bookType : Int
  def addBook = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("book").as[JsObject]

    bookRepository.insert(body.value("title").as[String], body.value("author").as[Int], body.value("publishingHouse").as[Int], body.value("publishYear").as[Int],
      body.value("description").as[String], body.value("price").as[Float], body.value("bookType").as[Int])
      .map(book => Ok(Json.toJson(book)))

  }

  def deleteBook(id: Integer) = Action.async {
    bookRepository.delete(id).map(book => Ok(Json.toJson(book)))
  }

  def editBook(id: Integer) = Action.async { implicit request =>
    val body: JsObject = request.body.asJson.get("book").as[JsObject]

    bookRepository.edit(id, body.value("title").as[String], body.value("author").as[Int], body.value("publishingHouse").as[Int],
      body.value("publishYear").as[Int], body.value("description").as[String], body.value("price").as[Float], body.value("bookType").as[Int])
      .map(book => Ok(Json.toJson(book)))

  }

}
