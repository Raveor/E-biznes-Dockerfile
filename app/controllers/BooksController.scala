package controllers

import akka.actor.ActorSystem
import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models.BookRepository
import org.webjars.play.WebJarsUtil
import play.api.libs.json.{ JsObject, Json }
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.ExecutionContext

@Singleton
class BooksController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv],
  bookRepository: BookRepository, actorSystem: ActorSystem)(implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder, exec: ExecutionContext
) extends AbstractController(cc) {

  def getAllBooks = silhouette.UnsecuredAction.async { implicit request =>
    bookRepository
      .list()
      .map { books =>
        Ok(Json.toJson(books))
      }
  }

  def getBookById(id: Integer) = silhouette.UnsecuredAction.async { implicit request =>
    bookRepository
      .getById(id)
      .map(book => Ok(Json.toJson(book)))
  }

  def addBook = silhouette.SecuredAction.async { implicit request =>
    val body: JsObject = request.body.asJson.get("book").as[JsObject]

    bookRepository.insert(body.value("title").as[String], body.value("author").as[Int], body.value("publishingHouse").as[Int], body.value("publishYear").as[Int],
      body.value("description").as[String], body.value("price").as[Float], body.value("bookType").as[Int])
      .map(book => Ok(Json.toJson(book)))

  }

  def deleteBook(id: Integer) = silhouette.SecuredAction.async {
    bookRepository.delete(id).map(book => Ok(Json.toJson(book)))
  }

  def editBook(id: Integer) = silhouette.SecuredAction.async { implicit request =>
    val body: JsObject = request.body.asJson.get("book").as[JsObject]

    bookRepository.edit(id, body.value("title").as[String], body.value("author").as[Int], body.value("publishingHouse").as[Int],
      body.value("publishYear").as[Int], body.value("description").as[String], body.value("price").as[Float], body.value("bookType").as[Int])
      .map(book => Ok(Json.toJson(book)))

  }

}
