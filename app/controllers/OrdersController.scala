package controllers

import akka.actor.ActorSystem
import javax.inject._
import models.OrderRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext


@Singleton
class OrdersController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem, orderRepository: OrderRepository)
                                (implicit exec: ExecutionContext) extends AbstractController(cc) {
  def getAllOrders = Action.async { implicit request =>
    orderRepository
      .list()
      .map(orders => Ok(Json.toJson(orders)))
  }

  def getOrderById(id: Integer) = Action.async { implicit request =>
    orderRepository
      .getById(id)
      .map(order => Ok(Json.toJson(order)))
  }

  def addOrder = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def deleteOrder(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  def editOrder(id: Integer) = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
