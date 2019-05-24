package models

import play.api.libs.json.Json

case class BookType(id: Int, name: String)

object BookType {
  implicit val bookTypeFormat = Json.format[BookType]
}
