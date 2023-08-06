import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { labels, priorities, statuses } from "../constants/services-data-table-constants"


const services = Array.from({ length: 100 }, () => ({
  id: `SV-${faker.datatype.number({ min: 1, max: 400 })}`,
  name: faker.hacker.noun(),
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
}))

fs.writeFileSync(
  path.join(__dirname, "services.json"),
  JSON.stringify(services, null, 2)
)