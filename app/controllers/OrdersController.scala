package controllers

import akka.actor.ActorSystem
import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models.OrderRepository
import org.webjars.play.WebJarsUtil
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.ExecutionContext

@Singleton
class OrdersController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv], actorSystem: ActorSystem, orderRepository: OrderRepository)(implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder, exec: ExecutionContext) extends AbstractController(cc) {
  def getAllOrders = silhouette.SecuredAction.async { implicit request =>
    orderRepository
      .list()
      .map(orders => Ok(Json.toJson(orders)))
  }

  def getOrderById(id: Integer) = silhouette.SecuredAction.async { implicit request =>
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
