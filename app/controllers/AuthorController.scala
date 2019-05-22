package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future, Promise}


@Singleton
class AuthorController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {
  def getAllAuthors = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def getAuthorById(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def addAuthor = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def deleteAuthor(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def editAuthor(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
