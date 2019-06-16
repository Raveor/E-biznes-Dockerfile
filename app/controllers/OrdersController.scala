package controllers

import akka.actor.ActorSystem
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import javax.inject._
import models.{ Client, ClientRepository, Order2BooksRepository, OrderRepository }
import org.webjars.play.WebJarsUtil
import play.api.libs.json._
import play.api.mvc._
import play.libs.F.Tuple
import utils.auth.DefaultEnv

import scala.collection.mutable.ListBuffer
import scala.concurrent.ExecutionContext

@Singleton
class OrdersController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv], actorSystem: ActorSystem, orderRepository: OrderRepository,
  order2BooksRepository: Order2BooksRepository, clientRepository: ClientRepository)(implicit
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

  def getAllClientOrders(id: Integer) = silhouette.SecuredAction.async { implicit request =>
    orderRepository
      .getByClientId(id)
      .map(order => {
        Console.println(order)
        Ok(Json.toJson(order))
      })
  }

  def getAllBooksFromOrder(id: Integer) = silhouette.SecuredAction.async { implicit request =>
    order2BooksRepository
      .getById(id)
      .map(order => Ok(Json.toJson(order)))
  }

  def addOrder = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    val items = request.body.asJson.get("order").as[JsObject].value("books").as[JsArray].value

    clientRepository.getByProvider(request.identity.loginInfo.providerID, request.identity.loginInfo.providerKey).map(client => client.head).flatMap(client =>
      orderRepository.insert(client.id).map(order_id => {
        for (item <- items) {
          val book_id = item.asInstanceOf[JsObject].value("book_id").as[Int]
          val quantity = item.asInstanceOf[JsObject].value("quantity").as[Int]
          order2BooksRepository.insert(order_id.id, book_id, quantity)
        }
        Ok(Json.toJson(order_id))
      })
    )

  }

  def deleteOrder(id: Integer) = silhouette.SecuredAction.async {
    order2BooksRepository.delete(id)
    orderRepository.delete(id).map(order => Ok(Json.toJson(order)))
  }

}
