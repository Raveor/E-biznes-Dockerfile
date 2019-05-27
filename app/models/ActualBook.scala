package models

import play.api.libs.json.Json

case class ActualBook(id: Int, title: String, authorName: String, authorSurname: String, publishingHouseName: String,
                      publishYear: Int, description: String, price: Float)

object ActualBook {
  implicit val actualBookFormat = Json.format[ActualBook]
}