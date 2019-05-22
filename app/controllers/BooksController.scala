package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.ExecutionContext

@Singleton
class BooksController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def getAllBooks = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def getBookById(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def addBook = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def deleteBook(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def editBook(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
