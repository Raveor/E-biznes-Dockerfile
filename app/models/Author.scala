package models

import play.api.libs.json.Json

case class Author(id: Int, surname: String, name: String)

object Author {
  implicit val authorFormat = Json.format[Author]
}
