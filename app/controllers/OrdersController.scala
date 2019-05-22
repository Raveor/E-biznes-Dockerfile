package controllers

import akka.actor.ActorSystem
import javax.inject._
import play.api.mvc._

import scala.concurrent.ExecutionContext


@Singleton
class OrdersController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {
  def getAllOrders = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def getOrderById(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def addOrder = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def deleteOrder(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

  def editOrder(id: Integer) = Action {
    Ok(views.html.index("administration/categories/add"))
  }

}
