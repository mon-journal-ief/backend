
/**
 * Client
 */

import * as runtime from '@axiia/prisma-client-denofix/runtime/library'
import * as process from 'node:process'
import * as path from 'node:path'
    import { fileURLToPath } from 'node:url'

    const __dirname = path.dirname(fileURLToPath(import.meta.url))


export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model KeyValuePairs
 * 
 */
export type KeyValuePairs = runtime.Types.Result.DefaultSelection<Prisma.$KeyValuePairsPayload>
/**
 * Model Program
 * 
 */
export type Program = runtime.Types.Result.DefaultSelection<Prisma.$ProgramPayload>
/**
 * Model ProgramElement
 * 
 */
export type ProgramElement = runtime.Types.Result.DefaultSelection<Prisma.$ProgramElementPayload>
/**
 * Model Child
 * 
 */
export type Child = runtime.Types.Result.DefaultSelection<Prisma.$ChildPayload>
/**
 * Model JournalEntry
 * 
 */
export type JournalEntry = runtime.Types.Result.DefaultSelection<Prisma.$JournalEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Grade = {
  CP: 'CP',
  CE1: 'CE1',
  CE2: 'CE2',
  CM1: 'CM1',
  CM2: 'CM2'
} as const

export type Grade = (typeof Grade)[keyof typeof Grade]

}

export type Gender = $Enums.Gender

export const Gender = $Enums.Gender

export type Grade = $Enums.Grade

export const Grade = $Enums.Grade



/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-ts"
    },
    "output": {
      "value": "/home/whiterqbbit/code/ief/prisma-deno-demo/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "moduleFormat": "esm",
      "generatedFileExtension": "ts",
      "importFileExtension": "ts",
      "runtime": "deno",
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/whiterqbbit/code/ief/prisma-deno-demo/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://postgres:postgres@localhost:5435/ief_db"
      }
    }
  },
  "inlineSchema": "generator client {\n  // Required\n  provider = \"prisma-client-ts\"\n  output   = \"../generated/prisma\"\n\n  // Optional\n  runtime                = \"deno\"\n  generatedFileExtension = \"ts\"\n  importFileExtension    = \"ts\"\n  moduleFormat           = \"esm\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel KeyValuePairs {\n  scope String\n  key   String\n  value Bytes\n\n  @@id([scope, key])\n  @@map(\"key_value_pairs\")\n}\n\nenum Gender {\n  MALE\n  FEMALE\n}\n\nenum Grade {\n  CP\n  CE1\n  CE2\n  CM1\n  CM2\n}\n\nmodel Program {\n  id       String           @id @default(uuid())\n  name     String\n  grade    Grade\n  elements ProgramElement[]\n  children Child[]\n}\n\nmodel ProgramElement {\n  id             String         @id @default(uuid())\n  name           String\n  description    String\n  program        Program        @relation(fields: [programId], references: [id])\n  programId      String\n  journalEntries JournalEntry[] @relation(\"ValidatedElements\")\n}\n\nmodel Child {\n  id             String         @id @default(uuid())\n  name           String\n  firstName      String\n  age            Int\n  gender         Gender\n  birthDate      DateTime\n  program        Program        @relation(fields: [programId], references: [id])\n  programId      String\n  journalEntries JournalEntry[]\n}\n\nmodel JournalEntry {\n  id                String           @id @default(uuid())\n  date              DateTime\n  comment           String\n  images            String[]\n  validatedElements ProgramElement[] @relation(\"ValidatedElements\")\n  child             Child            @relation(fields: [childId], references: [id])\n  childId           String\n}\n",
  "inlineSchemaHash": "37b1d10d4d98c2e1f31642c370dfb592a596719d3600d5f0e4d9be186affa58f",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
}
config.dirname = __dirname

config.runtimeDataModel = JSON.parse("{\"models\":{\"KeyValuePairs\":{\"dbName\":\"key_value_pairs\",\"schema\":null,\"fields\":[{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"scope\",\"key\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Program\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grade\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Grade\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"elements\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProgramElement\",\"nativeType\":null,\"relationName\":\"ProgramToProgramElement\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"children\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Child\",\"nativeType\":null,\"relationName\":\"ChildToProgram\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProgramElement\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"program\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Program\",\"nativeType\":null,\"relationName\":\"ProgramToProgramElement\",\"relationFromFields\":[\"programId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"programId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"journalEntries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JournalEntry\",\"nativeType\":null,\"relationName\":\"ValidatedElements\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Child\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"age\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Gender\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"birthDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"program\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Program\",\"nativeType\":null,\"relationName\":\"ChildToProgram\",\"relationFromFields\":[\"programId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"programId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"journalEntries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JournalEntry\",\"nativeType\":null,\"relationName\":\"ChildToJournalEntry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"JournalEntry\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validatedElements\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProgramElement\",\"nativeType\":null,\"relationName\":\"ValidatedElements\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"child\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Child\",\"nativeType\":null,\"relationName\":\"ChildToJournalEntry\",\"relationFromFields\":[\"childId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"childId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Gender\":{\"values\":[{\"name\":\"MALE\",\"dbName\":null},{\"name\":\"FEMALE\",\"dbName\":null}],\"dbName\":null},\"Grade\":{\"values\":[{\"name\":\"CP\",\"dbName\":null},{\"name\":\"CE1\",\"dbName\":null},{\"name\":\"CE2\",\"dbName\":null},{\"name\":\"CM1\",\"dbName\":null},{\"name\":\"CM2\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
config.engineWasm = undefined
config.compilerWasm = undefined



// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node")
path.join(process.cwd(), "../generated/prisma/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma")
path.join(process.cwd(), "../generated/prisma/schema.prisma")


interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more KeyValuePairs
   * const keyValuePairs = await prisma.keyValuePairs.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new <
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>): PrismaClient<ClientOptions, U, ExtArgs>
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more KeyValuePairs
 * const keyValuePairs = await prisma.keyValuePairs.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>


  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.keyValuePairs`: Exposes CRUD operations for the **KeyValuePairs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KeyValuePairs
    * const keyValuePairs = await prisma.keyValuePairs.findMany()
    * ```
    */
  get keyValuePairs(): Prisma.KeyValuePairsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.program`: Exposes CRUD operations for the **Program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.ProgramDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.programElement`: Exposes CRUD operations for the **ProgramElement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgramElements
    * const programElements = await prisma.programElement.findMany()
    * ```
    */
  get programElement(): Prisma.ProgramElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.child`: Exposes CRUD operations for the **Child** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Children
    * const children = await prisma.child.findMany()
    * ```
    */
  get child(): Prisma.ChildDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.journalEntry`: Exposes CRUD operations for the **JournalEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JournalEntries
    * const journalEntries = await prisma.journalEntry.findMany()
    * ```
    */
  get journalEntry(): Prisma.JournalEntryDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(config) as unknown as PrismaClientConstructor

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Validator
   */
  export const validator = runtime.Public.validator

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

  export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

  export const PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export type PrismaClientInitializationError = runtime.PrismaClientInitializationError

  export const PrismaClientValidationError = runtime.PrismaClientValidationError
  export type PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag
  export const empty = runtime.empty
  export const join = runtime.join
  export const raw = runtime.raw
  export const Sql = runtime.Sql
  export type Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal
  export type Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = runtime.Types.Extensions.UserArgs
  export const getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>
  export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>
  export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

  export type PrismaVersion = {
    client: string
    engine: string
  }

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: "6.6.0",
    engine: "f676762280b54cd07c770017ed3711ddde35f37a"
  }

  /**
   * Utility Types
   */


  export type JsonObject = runtime.JsonObject
  export type JsonArray = runtime.JsonArray
  export type JsonValue = runtime.JsonValue
  export type InputJsonObject = runtime.InputJsonObject
  export type InputJsonArray = runtime.InputJsonArray
  export type InputJsonValue = runtime.InputJsonValue

  export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull),
    JsonNull: runtime.objectEnumValues.classes.JsonNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull),
    AnyNull: runtime.objectEnumValues.classes.AnyNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull),
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull = runtime.objectEnumValues.instances.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull = runtime.objectEnumValues.instances.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull = runtime.objectEnumValues.instances.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False

  export type True = 1

  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName = {
    KeyValuePairs: 'KeyValuePairs',
    Program: 'Program',
    ProgramElement: 'ProgramElement',
    Child: 'Child',
    JournalEntry: 'JournalEntry'
  } as const

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export interface TypeMapCb<ClientOptions = {}> extends runtime.Types.Utils.Fn<{extArgs: runtime.Types.Extensions.InternalArgs }, runtime.Types.Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "keyValuePairs" | "program" | "programElement" | "child" | "journalEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      KeyValuePairs: {
        payload: Prisma.$KeyValuePairsPayload<ExtArgs>
        fields: Prisma.KeyValuePairsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KeyValuePairsFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KeyValuePairsFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>
          }
          findFirst: {
            args: Prisma.KeyValuePairsFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KeyValuePairsFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>
          }
          findMany: {
            args: Prisma.KeyValuePairsFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>[]
          }
          create: {
            args: Prisma.KeyValuePairsCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>
          }
          createMany: {
            args: Prisma.KeyValuePairsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KeyValuePairsCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>[]
          }
          delete: {
            args: Prisma.KeyValuePairsDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>
          }
          update: {
            args: Prisma.KeyValuePairsUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>
          }
          deleteMany: {
            args: Prisma.KeyValuePairsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KeyValuePairsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KeyValuePairsUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>[]
          }
          upsert: {
            args: Prisma.KeyValuePairsUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyValuePairsPayload>
          }
          aggregate: {
            args: Prisma.KeyValuePairsAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateKeyValuePairs>
          }
          groupBy: {
            args: Prisma.KeyValuePairsGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<KeyValuePairsGroupByOutputType>[]
          }
          count: {
            args: Prisma.KeyValuePairsCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<KeyValuePairsCountAggregateOutputType> | number
          }
        }
      }
      Program: {
        payload: Prisma.$ProgramPayload<ExtArgs>
        fields: Prisma.ProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findFirst: {
            args: Prisma.ProgramFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findMany: {
            args: Prisma.ProgramFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          create: {
            args: Prisma.ProgramCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          createMany: {
            args: Prisma.ProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          delete: {
            args: Prisma.ProgramDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          update: {
            args: Prisma.ProgramUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          deleteMany: {
            args: Prisma.ProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          upsert: {
            args: Prisma.ProgramUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.ProgramGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ProgramCountAggregateOutputType> | number
          }
        }
      }
      ProgramElement: {
        payload: Prisma.$ProgramElementPayload<ExtArgs>
        fields: Prisma.ProgramElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramElementFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramElementFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>
          }
          findFirst: {
            args: Prisma.ProgramElementFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramElementFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>
          }
          findMany: {
            args: Prisma.ProgramElementFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>[]
          }
          create: {
            args: Prisma.ProgramElementCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>
          }
          createMany: {
            args: Prisma.ProgramElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramElementCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>[]
          }
          delete: {
            args: Prisma.ProgramElementDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>
          }
          update: {
            args: Prisma.ProgramElementUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>
          }
          deleteMany: {
            args: Prisma.ProgramElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramElementUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>[]
          }
          upsert: {
            args: Prisma.ProgramElementUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramElementPayload>
          }
          aggregate: {
            args: Prisma.ProgramElementAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateProgramElement>
          }
          groupBy: {
            args: Prisma.ProgramElementGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ProgramElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramElementCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ProgramElementCountAggregateOutputType> | number
          }
        }
      }
      Child: {
        payload: Prisma.$ChildPayload<ExtArgs>
        fields: Prisma.ChildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChildFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChildFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findFirst: {
            args: Prisma.ChildFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChildFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findMany: {
            args: Prisma.ChildFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          create: {
            args: Prisma.ChildCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          createMany: {
            args: Prisma.ChildCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChildCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          delete: {
            args: Prisma.ChildDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          update: {
            args: Prisma.ChildUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          deleteMany: {
            args: Prisma.ChildDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChildUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChildUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          upsert: {
            args: Prisma.ChildUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          aggregate: {
            args: Prisma.ChildAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateChild>
          }
          groupBy: {
            args: Prisma.ChildGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ChildGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChildCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<ChildCountAggregateOutputType> | number
          }
        }
      }
      JournalEntry: {
        payload: Prisma.$JournalEntryPayload<ExtArgs>
        fields: Prisma.JournalEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JournalEntryFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JournalEntryFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          findFirst: {
            args: Prisma.JournalEntryFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JournalEntryFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          findMany: {
            args: Prisma.JournalEntryFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>[]
          }
          create: {
            args: Prisma.JournalEntryCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          createMany: {
            args: Prisma.JournalEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JournalEntryCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>[]
          }
          delete: {
            args: Prisma.JournalEntryDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          update: {
            args: Prisma.JournalEntryUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          deleteMany: {
            args: Prisma.JournalEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JournalEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JournalEntryUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>[]
          }
          upsert: {
            args: Prisma.JournalEntryUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          aggregate: {
            args: Prisma.JournalEntryAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateJournalEntry>
          }
          groupBy: {
            args: Prisma.JournalEntryGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<JournalEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.JournalEntryCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<JournalEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", Prisma.TypeMapCb, runtime.Types.Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    keyValuePairs?: KeyValuePairsOmit
    program?: ProgramOmit
    programElement?: ProgramElementOmit
    child?: ChildOmit
    journalEntry?: JournalEntryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
  ) => runtime.Types.Utils.JsPromise<T>

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProgramCountOutputType
   */

  export type ProgramCountOutputType = {
    elements: number
    children: number
  }

  export type ProgramCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    elements?: boolean | ProgramCountOutputTypeCountElementsArgs
    children?: boolean | ProgramCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramCountOutputType
     */
    select?: ProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountElementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: ProgramElementWhereInput
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountChildrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: ChildWhereInput
  }


  /**
   * Count Type ProgramElementCountOutputType
   */

  export type ProgramElementCountOutputType = {
    journalEntries: number
  }

  export type ProgramElementCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    journalEntries?: boolean | ProgramElementCountOutputTypeCountJournalEntriesArgs
  }

  // Custom InputTypes
  /**
   * ProgramElementCountOutputType without action
   */
  export type ProgramElementCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElementCountOutputType
     */
    select?: ProgramElementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramElementCountOutputType without action
   */
  export type ProgramElementCountOutputTypeCountJournalEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: JournalEntryWhereInput
  }


  /**
   * Count Type ChildCountOutputType
   */

  export type ChildCountOutputType = {
    journalEntries: number
  }

  export type ChildCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    journalEntries?: boolean | ChildCountOutputTypeCountJournalEntriesArgs
  }

  // Custom InputTypes
  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChildCountOutputType
     */
    select?: ChildCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountJournalEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: JournalEntryWhereInput
  }


  /**
   * Count Type JournalEntryCountOutputType
   */

  export type JournalEntryCountOutputType = {
    validatedElements: number
  }

  export type JournalEntryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    validatedElements?: boolean | JournalEntryCountOutputTypeCountValidatedElementsArgs
  }

  // Custom InputTypes
  /**
   * JournalEntryCountOutputType without action
   */
  export type JournalEntryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntryCountOutputType
     */
    select?: JournalEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JournalEntryCountOutputType without action
   */
  export type JournalEntryCountOutputTypeCountValidatedElementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: ProgramElementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model KeyValuePairs
   */

  export type AggregateKeyValuePairs = {
    _count: KeyValuePairsCountAggregateOutputType | null
    _min: KeyValuePairsMinAggregateOutputType | null
    _max: KeyValuePairsMaxAggregateOutputType | null
  }

  export type KeyValuePairsMinAggregateOutputType = {
    scope: string | null
    key: string | null
    value: Uint8Array | null
  }

  export type KeyValuePairsMaxAggregateOutputType = {
    scope: string | null
    key: string | null
    value: Uint8Array | null
  }

  export type KeyValuePairsCountAggregateOutputType = {
    scope: number
    key: number
    value: number
    _all: number
  }


  export type KeyValuePairsMinAggregateInputType = {
    scope?: true
    key?: true
    value?: true
  }

  export type KeyValuePairsMaxAggregateInputType = {
    scope?: true
    key?: true
    value?: true
  }

  export type KeyValuePairsCountAggregateInputType = {
    scope?: true
    key?: true
    value?: true
    _all?: true
  }

  export type KeyValuePairsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KeyValuePairs to aggregate.
     */
    where?: KeyValuePairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyValuePairs to fetch.
     */
    orderBy?: KeyValuePairsOrderByWithRelationInput | KeyValuePairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KeyValuePairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyValuePairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyValuePairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KeyValuePairs
    **/
    _count?: true | KeyValuePairsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KeyValuePairsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KeyValuePairsMaxAggregateInputType
  }

  export type GetKeyValuePairsAggregateType<T extends KeyValuePairsAggregateArgs> = {
        [P in keyof T & keyof AggregateKeyValuePairs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKeyValuePairs[P]>
      : GetScalarType<T[P], AggregateKeyValuePairs[P]>
  }




  export type KeyValuePairsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: KeyValuePairsWhereInput
    orderBy?: KeyValuePairsOrderByWithAggregationInput | KeyValuePairsOrderByWithAggregationInput[]
    by: KeyValuePairsScalarFieldEnum[] | KeyValuePairsScalarFieldEnum
    having?: KeyValuePairsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KeyValuePairsCountAggregateInputType | true
    _min?: KeyValuePairsMinAggregateInputType
    _max?: KeyValuePairsMaxAggregateInputType
  }

  export type KeyValuePairsGroupByOutputType = {
    scope: string
    key: string
    value: Uint8Array
    _count: KeyValuePairsCountAggregateOutputType | null
    _min: KeyValuePairsMinAggregateOutputType | null
    _max: KeyValuePairsMaxAggregateOutputType | null
  }

  type GetKeyValuePairsGroupByPayload<T extends KeyValuePairsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KeyValuePairsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KeyValuePairsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KeyValuePairsGroupByOutputType[P]>
            : GetScalarType<T[P], KeyValuePairsGroupByOutputType[P]>
        }
      >
    >


  export type KeyValuePairsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    scope?: boolean
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["keyValuePairs"]>

  export type KeyValuePairsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    scope?: boolean
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["keyValuePairs"]>

  export type KeyValuePairsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    scope?: boolean
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["keyValuePairs"]>

  export type KeyValuePairsSelectScalar = {
    scope?: boolean
    key?: boolean
    value?: boolean
  }

  export type KeyValuePairsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"scope" | "key" | "value", ExtArgs["result"]["keyValuePairs"]>

  export type $KeyValuePairsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KeyValuePairs"
    objects: {}
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      scope: string
      key: string
      value: Uint8Array
    }, ExtArgs["result"]["keyValuePairs"]>
    composites: {}
  }

  export type KeyValuePairsGetPayload<S extends boolean | null | undefined | KeyValuePairsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload, S>

  export type KeyValuePairsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<KeyValuePairsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KeyValuePairsCountAggregateInputType | true
    }

  export interface KeyValuePairsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KeyValuePairs'], meta: { name: 'KeyValuePairs' } }
    /**
     * Find zero or one KeyValuePairs that matches the filter.
     * @param {KeyValuePairsFindUniqueArgs} args - Arguments to find a KeyValuePairs
     * @example
     * // Get one KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeyValuePairsFindUniqueArgs>(args: SelectSubset<T, KeyValuePairsFindUniqueArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KeyValuePairs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeyValuePairsFindUniqueOrThrowArgs} args - Arguments to find a KeyValuePairs
     * @example
     * // Get one KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeyValuePairsFindUniqueOrThrowArgs>(args: SelectSubset<T, KeyValuePairsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KeyValuePairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsFindFirstArgs} args - Arguments to find a KeyValuePairs
     * @example
     * // Get one KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeyValuePairsFindFirstArgs>(args?: SelectSubset<T, KeyValuePairsFindFirstArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KeyValuePairs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsFindFirstOrThrowArgs} args - Arguments to find a KeyValuePairs
     * @example
     * // Get one KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeyValuePairsFindFirstOrThrowArgs>(args?: SelectSubset<T, KeyValuePairsFindFirstOrThrowArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KeyValuePairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.findMany()
     * 
     * // Get first 10 KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.findMany({ take: 10 })
     * 
     * // Only select the `scope`
     * const keyValuePairsWithScopeOnly = await prisma.keyValuePairs.findMany({ select: { scope: true } })
     * 
     */
    findMany<T extends KeyValuePairsFindManyArgs>(args?: SelectSubset<T, KeyValuePairsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KeyValuePairs.
     * @param {KeyValuePairsCreateArgs} args - Arguments to create a KeyValuePairs.
     * @example
     * // Create one KeyValuePairs
     * const KeyValuePairs = await prisma.keyValuePairs.create({
     *   data: {
     *     // ... data to create a KeyValuePairs
     *   }
     * })
     * 
     */
    create<T extends KeyValuePairsCreateArgs>(args: SelectSubset<T, KeyValuePairsCreateArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KeyValuePairs.
     * @param {KeyValuePairsCreateManyArgs} args - Arguments to create many KeyValuePairs.
     * @example
     * // Create many KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KeyValuePairsCreateManyArgs>(args?: SelectSubset<T, KeyValuePairsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KeyValuePairs and returns the data saved in the database.
     * @param {KeyValuePairsCreateManyAndReturnArgs} args - Arguments to create many KeyValuePairs.
     * @example
     * // Create many KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KeyValuePairs and only return the `scope`
     * const keyValuePairsWithScopeOnly = await prisma.keyValuePairs.createManyAndReturn({
     *   select: { scope: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KeyValuePairsCreateManyAndReturnArgs>(args?: SelectSubset<T, KeyValuePairsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KeyValuePairs.
     * @param {KeyValuePairsDeleteArgs} args - Arguments to delete one KeyValuePairs.
     * @example
     * // Delete one KeyValuePairs
     * const KeyValuePairs = await prisma.keyValuePairs.delete({
     *   where: {
     *     // ... filter to delete one KeyValuePairs
     *   }
     * })
     * 
     */
    delete<T extends KeyValuePairsDeleteArgs>(args: SelectSubset<T, KeyValuePairsDeleteArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KeyValuePairs.
     * @param {KeyValuePairsUpdateArgs} args - Arguments to update one KeyValuePairs.
     * @example
     * // Update one KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KeyValuePairsUpdateArgs>(args: SelectSubset<T, KeyValuePairsUpdateArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KeyValuePairs.
     * @param {KeyValuePairsDeleteManyArgs} args - Arguments to filter KeyValuePairs to delete.
     * @example
     * // Delete a few KeyValuePairs
     * const { count } = await prisma.keyValuePairs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KeyValuePairsDeleteManyArgs>(args?: SelectSubset<T, KeyValuePairsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KeyValuePairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KeyValuePairsUpdateManyArgs>(args: SelectSubset<T, KeyValuePairsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KeyValuePairs and returns the data updated in the database.
     * @param {KeyValuePairsUpdateManyAndReturnArgs} args - Arguments to update many KeyValuePairs.
     * @example
     * // Update many KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KeyValuePairs and only return the `scope`
     * const keyValuePairsWithScopeOnly = await prisma.keyValuePairs.updateManyAndReturn({
     *   select: { scope: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KeyValuePairsUpdateManyAndReturnArgs>(args: SelectSubset<T, KeyValuePairsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KeyValuePairs.
     * @param {KeyValuePairsUpsertArgs} args - Arguments to update or create a KeyValuePairs.
     * @example
     * // Update or create a KeyValuePairs
     * const keyValuePairs = await prisma.keyValuePairs.upsert({
     *   create: {
     *     // ... data to create a KeyValuePairs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KeyValuePairs we want to update
     *   }
     * })
     */
    upsert<T extends KeyValuePairsUpsertArgs>(args: SelectSubset<T, KeyValuePairsUpsertArgs<ExtArgs>>): Prisma__KeyValuePairsClient<runtime.Types.Result.GetResult<Prisma.$KeyValuePairsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KeyValuePairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsCountArgs} args - Arguments to filter KeyValuePairs to count.
     * @example
     * // Count the number of KeyValuePairs
     * const count = await prisma.keyValuePairs.count({
     *   where: {
     *     // ... the filter for the KeyValuePairs we want to count
     *   }
     * })
    **/
    count<T extends KeyValuePairsCountArgs>(
      args?: Subset<T, KeyValuePairsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KeyValuePairsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KeyValuePairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KeyValuePairsAggregateArgs>(args: Subset<T, KeyValuePairsAggregateArgs>): Prisma.PrismaPromise<GetKeyValuePairsAggregateType<T>>

    /**
     * Group by KeyValuePairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyValuePairsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KeyValuePairsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KeyValuePairsGroupByArgs['orderBy'] }
        : { orderBy?: KeyValuePairsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KeyValuePairsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeyValuePairsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KeyValuePairs model
   */
  readonly fields: KeyValuePairsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KeyValuePairs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KeyValuePairsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the KeyValuePairs model
   */
  export interface KeyValuePairsFieldRefs {
    readonly scope: FieldRef<"KeyValuePairs", 'String'>
    readonly key: FieldRef<"KeyValuePairs", 'String'>
    readonly value: FieldRef<"KeyValuePairs", 'Bytes'>
  }
    

  // Custom InputTypes
  /**
   * KeyValuePairs findUnique
   */
  export type KeyValuePairsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * Filter, which KeyValuePairs to fetch.
     */
    where: KeyValuePairsWhereUniqueInput
  }

  /**
   * KeyValuePairs findUniqueOrThrow
   */
  export type KeyValuePairsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * Filter, which KeyValuePairs to fetch.
     */
    where: KeyValuePairsWhereUniqueInput
  }

  /**
   * KeyValuePairs findFirst
   */
  export type KeyValuePairsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * Filter, which KeyValuePairs to fetch.
     */
    where?: KeyValuePairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyValuePairs to fetch.
     */
    orderBy?: KeyValuePairsOrderByWithRelationInput | KeyValuePairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KeyValuePairs.
     */
    cursor?: KeyValuePairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyValuePairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyValuePairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KeyValuePairs.
     */
    distinct?: KeyValuePairsScalarFieldEnum | KeyValuePairsScalarFieldEnum[]
  }

  /**
   * KeyValuePairs findFirstOrThrow
   */
  export type KeyValuePairsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * Filter, which KeyValuePairs to fetch.
     */
    where?: KeyValuePairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyValuePairs to fetch.
     */
    orderBy?: KeyValuePairsOrderByWithRelationInput | KeyValuePairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KeyValuePairs.
     */
    cursor?: KeyValuePairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyValuePairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyValuePairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KeyValuePairs.
     */
    distinct?: KeyValuePairsScalarFieldEnum | KeyValuePairsScalarFieldEnum[]
  }

  /**
   * KeyValuePairs findMany
   */
  export type KeyValuePairsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * Filter, which KeyValuePairs to fetch.
     */
    where?: KeyValuePairsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyValuePairs to fetch.
     */
    orderBy?: KeyValuePairsOrderByWithRelationInput | KeyValuePairsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KeyValuePairs.
     */
    cursor?: KeyValuePairsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyValuePairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyValuePairs.
     */
    skip?: number
    distinct?: KeyValuePairsScalarFieldEnum | KeyValuePairsScalarFieldEnum[]
  }

  /**
   * KeyValuePairs create
   */
  export type KeyValuePairsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * The data needed to create a KeyValuePairs.
     */
    data: XOR<KeyValuePairsCreateInput, KeyValuePairsUncheckedCreateInput>
  }

  /**
   * KeyValuePairs createMany
   */
  export type KeyValuePairsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many KeyValuePairs.
     */
    data: KeyValuePairsCreateManyInput | KeyValuePairsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KeyValuePairs createManyAndReturn
   */
  export type KeyValuePairsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * The data used to create many KeyValuePairs.
     */
    data: KeyValuePairsCreateManyInput | KeyValuePairsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KeyValuePairs update
   */
  export type KeyValuePairsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * The data needed to update a KeyValuePairs.
     */
    data: XOR<KeyValuePairsUpdateInput, KeyValuePairsUncheckedUpdateInput>
    /**
     * Choose, which KeyValuePairs to update.
     */
    where: KeyValuePairsWhereUniqueInput
  }

  /**
   * KeyValuePairs updateMany
   */
  export type KeyValuePairsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update KeyValuePairs.
     */
    data: XOR<KeyValuePairsUpdateManyMutationInput, KeyValuePairsUncheckedUpdateManyInput>
    /**
     * Filter which KeyValuePairs to update
     */
    where?: KeyValuePairsWhereInput
    /**
     * Limit how many KeyValuePairs to update.
     */
    limit?: number
  }

  /**
   * KeyValuePairs updateManyAndReturn
   */
  export type KeyValuePairsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * The data used to update KeyValuePairs.
     */
    data: XOR<KeyValuePairsUpdateManyMutationInput, KeyValuePairsUncheckedUpdateManyInput>
    /**
     * Filter which KeyValuePairs to update
     */
    where?: KeyValuePairsWhereInput
    /**
     * Limit how many KeyValuePairs to update.
     */
    limit?: number
  }

  /**
   * KeyValuePairs upsert
   */
  export type KeyValuePairsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * The filter to search for the KeyValuePairs to update in case it exists.
     */
    where: KeyValuePairsWhereUniqueInput
    /**
     * In case the KeyValuePairs found by the `where` argument doesn't exist, create a new KeyValuePairs with this data.
     */
    create: XOR<KeyValuePairsCreateInput, KeyValuePairsUncheckedCreateInput>
    /**
     * In case the KeyValuePairs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KeyValuePairsUpdateInput, KeyValuePairsUncheckedUpdateInput>
  }

  /**
   * KeyValuePairs delete
   */
  export type KeyValuePairsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
    /**
     * Filter which KeyValuePairs to delete.
     */
    where: KeyValuePairsWhereUniqueInput
  }

  /**
   * KeyValuePairs deleteMany
   */
  export type KeyValuePairsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KeyValuePairs to delete
     */
    where?: KeyValuePairsWhereInput
    /**
     * Limit how many KeyValuePairs to delete.
     */
    limit?: number
  }

  /**
   * KeyValuePairs without action
   */
  export type KeyValuePairsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyValuePairs
     */
    select?: KeyValuePairsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyValuePairs
     */
    omit?: KeyValuePairsOmit<ExtArgs> | null
  }


  /**
   * Model Program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramMinAggregateOutputType = {
    id: string | null
    name: string | null
    grade: $Enums.Grade | null
  }

  export type ProgramMaxAggregateOutputType = {
    id: string | null
    name: string | null
    grade: $Enums.Grade | null
  }

  export type ProgramCountAggregateOutputType = {
    id: number
    name: number
    grade: number
    _all: number
  }


  export type ProgramMinAggregateInputType = {
    id?: true
    name?: true
    grade?: true
  }

  export type ProgramMaxAggregateInputType = {
    id?: true
    name?: true
    grade?: true
  }

  export type ProgramCountAggregateInputType = {
    id?: true
    name?: true
    grade?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Program to aggregate.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type ProgramGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithAggregationInput | ProgramOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: ProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    id: string
    name: string
    grade: $Enums.Grade
    _count: ProgramCountAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type ProgramSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    grade?: boolean
    elements?: boolean | Program$elementsArgs<ExtArgs>
    children?: boolean | Program$childrenArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    grade?: boolean
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    grade?: boolean
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectScalar = {
    id?: boolean
    name?: boolean
    grade?: boolean
  }

  export type ProgramOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "grade", ExtArgs["result"]["program"]>
  export type ProgramInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    elements?: boolean | Program$elementsArgs<ExtArgs>
    children?: boolean | Program$childrenArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type ProgramIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $ProgramPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Program"
    objects: {
      elements: Prisma.$ProgramElementPayload<ExtArgs>[]
      children: Prisma.$ChildPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      name: string
      grade: $Enums.Grade
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  export type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProgramPayload, S>

  export type ProgramCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface ProgramDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {ProgramFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramFindUniqueArgs>(args: SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramFindFirstArgs>(args?: SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWithIdOnly = await prisma.program.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramFindManyArgs>(args?: SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Program.
     * @param {ProgramCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends ProgramCreateArgs>(args: SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Programs.
     * @param {ProgramCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramCreateManyArgs>(args?: SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {ProgramCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Program.
     * @param {ProgramDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends ProgramDeleteArgs>(args: SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Program.
     * @param {ProgramUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramUpdateArgs>(args: SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Programs.
     * @param {ProgramDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramDeleteManyArgs>(args?: SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramUpdateManyArgs>(args: SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs and returns the data updated in the database.
     * @param {ProgramUpdateManyAndReturnArgs} args - Arguments to update many Programs.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgramUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Program.
     * @param {ProgramUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends ProgramUpsertArgs>(args: SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends ProgramCountArgs>(
      args?: Subset<T, ProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramGroupByArgs['orderBy'] }
        : { orderBy?: ProgramGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Program model
   */
  readonly fields: ProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elements<T extends Program$elementsArgs<ExtArgs> = {}>(args?: Subset<T, Program$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    children<T extends Program$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Program$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the Program model
   */
  export interface ProgramFieldRefs {
    readonly id: FieldRef<"Program", 'String'>
    readonly name: FieldRef<"Program", 'String'>
    readonly grade: FieldRef<"Program", 'Grade'>
  }
    

  // Custom InputTypes
  /**
   * Program findUnique
   */
  export type ProgramFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findUniqueOrThrow
   */
  export type ProgramFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findFirst
   */
  export type ProgramFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findFirstOrThrow
   */
  export type ProgramFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findMany
   */
  export type ProgramFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Programs to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program create
   */
  export type ProgramCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a Program.
     */
    data: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
  }

  /**
   * Program createMany
   */
  export type ProgramCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program createManyAndReturn
   */
  export type ProgramCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program update
   */
  export type ProgramUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a Program.
     */
    data: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
    /**
     * Choose, which Program to update.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program updateMany
   */
  export type ProgramUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
  }

  /**
   * Program updateManyAndReturn
   */
  export type ProgramUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
  }

  /**
   * Program upsert
   */
  export type ProgramUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the Program to update in case it exists.
     */
    where: ProgramWhereUniqueInput
    /**
     * In case the Program found by the `where` argument doesn't exist, create a new Program with this data.
     */
    create: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
    /**
     * In case the Program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
  }

  /**
   * Program delete
   */
  export type ProgramDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter which Program to delete.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program deleteMany
   */
  export type ProgramDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Programs to delete
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to delete.
     */
    limit?: number
  }

  /**
   * Program.elements
   */
  export type Program$elementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    where?: ProgramElementWhereInput
    orderBy?: ProgramElementOrderByWithRelationInput | ProgramElementOrderByWithRelationInput[]
    cursor?: ProgramElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramElementScalarFieldEnum | ProgramElementScalarFieldEnum[]
  }

  /**
   * Program.children
   */
  export type Program$childrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    where?: ChildWhereInput
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    cursor?: ChildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Program without action
   */
  export type ProgramDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
  }


  /**
   * Model ProgramElement
   */

  export type AggregateProgramElement = {
    _count: ProgramElementCountAggregateOutputType | null
    _min: ProgramElementMinAggregateOutputType | null
    _max: ProgramElementMaxAggregateOutputType | null
  }

  export type ProgramElementMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    programId: string | null
  }

  export type ProgramElementMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    programId: string | null
  }

  export type ProgramElementCountAggregateOutputType = {
    id: number
    name: number
    description: number
    programId: number
    _all: number
  }


  export type ProgramElementMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    programId?: true
  }

  export type ProgramElementMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    programId?: true
  }

  export type ProgramElementCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    programId?: true
    _all?: true
  }

  export type ProgramElementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramElement to aggregate.
     */
    where?: ProgramElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramElements to fetch.
     */
    orderBy?: ProgramElementOrderByWithRelationInput | ProgramElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgramElements
    **/
    _count?: true | ProgramElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramElementMaxAggregateInputType
  }

  export type GetProgramElementAggregateType<T extends ProgramElementAggregateArgs> = {
        [P in keyof T & keyof AggregateProgramElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgramElement[P]>
      : GetScalarType<T[P], AggregateProgramElement[P]>
  }




  export type ProgramElementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: ProgramElementWhereInput
    orderBy?: ProgramElementOrderByWithAggregationInput | ProgramElementOrderByWithAggregationInput[]
    by: ProgramElementScalarFieldEnum[] | ProgramElementScalarFieldEnum
    having?: ProgramElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramElementCountAggregateInputType | true
    _min?: ProgramElementMinAggregateInputType
    _max?: ProgramElementMaxAggregateInputType
  }

  export type ProgramElementGroupByOutputType = {
    id: string
    name: string
    description: string
    programId: string
    _count: ProgramElementCountAggregateOutputType | null
    _min: ProgramElementMinAggregateOutputType | null
    _max: ProgramElementMaxAggregateOutputType | null
  }

  type GetProgramElementGroupByPayload<T extends ProgramElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramElementGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramElementGroupByOutputType[P]>
        }
      >
    >


  export type ProgramElementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    programId?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    journalEntries?: boolean | ProgramElement$journalEntriesArgs<ExtArgs>
    _count?: boolean | ProgramElementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programElement"]>

  export type ProgramElementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    programId?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programElement"]>

  export type ProgramElementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    programId?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programElement"]>

  export type ProgramElementSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    programId?: boolean
  }

  export type ProgramElementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "programId", ExtArgs["result"]["programElement"]>
  export type ProgramElementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    journalEntries?: boolean | ProgramElement$journalEntriesArgs<ExtArgs>
    _count?: boolean | ProgramElementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramElementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }
  export type ProgramElementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }

  export type $ProgramElementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProgramElement"
    objects: {
      program: Prisma.$ProgramPayload<ExtArgs>
      journalEntries: Prisma.$JournalEntryPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      programId: string
    }, ExtArgs["result"]["programElement"]>
    composites: {}
  }

  export type ProgramElementGetPayload<S extends boolean | null | undefined | ProgramElementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload, S>

  export type ProgramElementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<ProgramElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramElementCountAggregateInputType | true
    }

  export interface ProgramElementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgramElement'], meta: { name: 'ProgramElement' } }
    /**
     * Find zero or one ProgramElement that matches the filter.
     * @param {ProgramElementFindUniqueArgs} args - Arguments to find a ProgramElement
     * @example
     * // Get one ProgramElement
     * const programElement = await prisma.programElement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramElementFindUniqueArgs>(args: SelectSubset<T, ProgramElementFindUniqueArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgramElement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramElementFindUniqueOrThrowArgs} args - Arguments to find a ProgramElement
     * @example
     * // Get one ProgramElement
     * const programElement = await prisma.programElement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramElementFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgramElement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementFindFirstArgs} args - Arguments to find a ProgramElement
     * @example
     * // Get one ProgramElement
     * const programElement = await prisma.programElement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramElementFindFirstArgs>(args?: SelectSubset<T, ProgramElementFindFirstArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgramElement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementFindFirstOrThrowArgs} args - Arguments to find a ProgramElement
     * @example
     * // Get one ProgramElement
     * const programElement = await prisma.programElement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramElementFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgramElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgramElements
     * const programElements = await prisma.programElement.findMany()
     * 
     * // Get first 10 ProgramElements
     * const programElements = await prisma.programElement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programElementWithIdOnly = await prisma.programElement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramElementFindManyArgs>(args?: SelectSubset<T, ProgramElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgramElement.
     * @param {ProgramElementCreateArgs} args - Arguments to create a ProgramElement.
     * @example
     * // Create one ProgramElement
     * const ProgramElement = await prisma.programElement.create({
     *   data: {
     *     // ... data to create a ProgramElement
     *   }
     * })
     * 
     */
    create<T extends ProgramElementCreateArgs>(args: SelectSubset<T, ProgramElementCreateArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgramElements.
     * @param {ProgramElementCreateManyArgs} args - Arguments to create many ProgramElements.
     * @example
     * // Create many ProgramElements
     * const programElement = await prisma.programElement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramElementCreateManyArgs>(args?: SelectSubset<T, ProgramElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgramElements and returns the data saved in the database.
     * @param {ProgramElementCreateManyAndReturnArgs} args - Arguments to create many ProgramElements.
     * @example
     * // Create many ProgramElements
     * const programElement = await prisma.programElement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgramElements and only return the `id`
     * const programElementWithIdOnly = await prisma.programElement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramElementCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgramElement.
     * @param {ProgramElementDeleteArgs} args - Arguments to delete one ProgramElement.
     * @example
     * // Delete one ProgramElement
     * const ProgramElement = await prisma.programElement.delete({
     *   where: {
     *     // ... filter to delete one ProgramElement
     *   }
     * })
     * 
     */
    delete<T extends ProgramElementDeleteArgs>(args: SelectSubset<T, ProgramElementDeleteArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgramElement.
     * @param {ProgramElementUpdateArgs} args - Arguments to update one ProgramElement.
     * @example
     * // Update one ProgramElement
     * const programElement = await prisma.programElement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramElementUpdateArgs>(args: SelectSubset<T, ProgramElementUpdateArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgramElements.
     * @param {ProgramElementDeleteManyArgs} args - Arguments to filter ProgramElements to delete.
     * @example
     * // Delete a few ProgramElements
     * const { count } = await prisma.programElement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramElementDeleteManyArgs>(args?: SelectSubset<T, ProgramElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgramElements
     * const programElement = await prisma.programElement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramElementUpdateManyArgs>(args: SelectSubset<T, ProgramElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramElements and returns the data updated in the database.
     * @param {ProgramElementUpdateManyAndReturnArgs} args - Arguments to update many ProgramElements.
     * @example
     * // Update many ProgramElements
     * const programElement = await prisma.programElement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgramElements and only return the `id`
     * const programElementWithIdOnly = await prisma.programElement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgramElementUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgramElement.
     * @param {ProgramElementUpsertArgs} args - Arguments to update or create a ProgramElement.
     * @example
     * // Update or create a ProgramElement
     * const programElement = await prisma.programElement.upsert({
     *   create: {
     *     // ... data to create a ProgramElement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgramElement we want to update
     *   }
     * })
     */
    upsert<T extends ProgramElementUpsertArgs>(args: SelectSubset<T, ProgramElementUpsertArgs<ExtArgs>>): Prisma__ProgramElementClient<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgramElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementCountArgs} args - Arguments to filter ProgramElements to count.
     * @example
     * // Count the number of ProgramElements
     * const count = await prisma.programElement.count({
     *   where: {
     *     // ... the filter for the ProgramElements we want to count
     *   }
     * })
    **/
    count<T extends ProgramElementCountArgs>(
      args?: Subset<T, ProgramElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgramElement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgramElementAggregateArgs>(args: Subset<T, ProgramElementAggregateArgs>): Prisma.PrismaPromise<GetProgramElementAggregateType<T>>

    /**
     * Group by ProgramElement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgramElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramElementGroupByArgs['orderBy'] }
        : { orderBy?: ProgramElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgramElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgramElement model
   */
  readonly fields: ProgramElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgramElement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramElementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    program<T extends ProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramDefaultArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    journalEntries<T extends ProgramElement$journalEntriesArgs<ExtArgs> = {}>(args?: Subset<T, ProgramElement$journalEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgramElement model
   */
  export interface ProgramElementFieldRefs {
    readonly id: FieldRef<"ProgramElement", 'String'>
    readonly name: FieldRef<"ProgramElement", 'String'>
    readonly description: FieldRef<"ProgramElement", 'String'>
    readonly programId: FieldRef<"ProgramElement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProgramElement findUnique
   */
  export type ProgramElementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * Filter, which ProgramElement to fetch.
     */
    where: ProgramElementWhereUniqueInput
  }

  /**
   * ProgramElement findUniqueOrThrow
   */
  export type ProgramElementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * Filter, which ProgramElement to fetch.
     */
    where: ProgramElementWhereUniqueInput
  }

  /**
   * ProgramElement findFirst
   */
  export type ProgramElementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * Filter, which ProgramElement to fetch.
     */
    where?: ProgramElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramElements to fetch.
     */
    orderBy?: ProgramElementOrderByWithRelationInput | ProgramElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramElements.
     */
    cursor?: ProgramElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramElements.
     */
    distinct?: ProgramElementScalarFieldEnum | ProgramElementScalarFieldEnum[]
  }

  /**
   * ProgramElement findFirstOrThrow
   */
  export type ProgramElementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * Filter, which ProgramElement to fetch.
     */
    where?: ProgramElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramElements to fetch.
     */
    orderBy?: ProgramElementOrderByWithRelationInput | ProgramElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramElements.
     */
    cursor?: ProgramElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramElements.
     */
    distinct?: ProgramElementScalarFieldEnum | ProgramElementScalarFieldEnum[]
  }

  /**
   * ProgramElement findMany
   */
  export type ProgramElementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * Filter, which ProgramElements to fetch.
     */
    where?: ProgramElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramElements to fetch.
     */
    orderBy?: ProgramElementOrderByWithRelationInput | ProgramElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgramElements.
     */
    cursor?: ProgramElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramElements.
     */
    skip?: number
    distinct?: ProgramElementScalarFieldEnum | ProgramElementScalarFieldEnum[]
  }

  /**
   * ProgramElement create
   */
  export type ProgramElementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgramElement.
     */
    data: XOR<ProgramElementCreateInput, ProgramElementUncheckedCreateInput>
  }

  /**
   * ProgramElement createMany
   */
  export type ProgramElementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgramElements.
     */
    data: ProgramElementCreateManyInput | ProgramElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgramElement createManyAndReturn
   */
  export type ProgramElementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * The data used to create many ProgramElements.
     */
    data: ProgramElementCreateManyInput | ProgramElementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgramElement update
   */
  export type ProgramElementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgramElement.
     */
    data: XOR<ProgramElementUpdateInput, ProgramElementUncheckedUpdateInput>
    /**
     * Choose, which ProgramElement to update.
     */
    where: ProgramElementWhereUniqueInput
  }

  /**
   * ProgramElement updateMany
   */
  export type ProgramElementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgramElements.
     */
    data: XOR<ProgramElementUpdateManyMutationInput, ProgramElementUncheckedUpdateManyInput>
    /**
     * Filter which ProgramElements to update
     */
    where?: ProgramElementWhereInput
    /**
     * Limit how many ProgramElements to update.
     */
    limit?: number
  }

  /**
   * ProgramElement updateManyAndReturn
   */
  export type ProgramElementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * The data used to update ProgramElements.
     */
    data: XOR<ProgramElementUpdateManyMutationInput, ProgramElementUncheckedUpdateManyInput>
    /**
     * Filter which ProgramElements to update
     */
    where?: ProgramElementWhereInput
    /**
     * Limit how many ProgramElements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgramElement upsert
   */
  export type ProgramElementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgramElement to update in case it exists.
     */
    where: ProgramElementWhereUniqueInput
    /**
     * In case the ProgramElement found by the `where` argument doesn't exist, create a new ProgramElement with this data.
     */
    create: XOR<ProgramElementCreateInput, ProgramElementUncheckedCreateInput>
    /**
     * In case the ProgramElement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramElementUpdateInput, ProgramElementUncheckedUpdateInput>
  }

  /**
   * ProgramElement delete
   */
  export type ProgramElementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    /**
     * Filter which ProgramElement to delete.
     */
    where: ProgramElementWhereUniqueInput
  }

  /**
   * ProgramElement deleteMany
   */
  export type ProgramElementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramElements to delete
     */
    where?: ProgramElementWhereInput
    /**
     * Limit how many ProgramElements to delete.
     */
    limit?: number
  }

  /**
   * ProgramElement.journalEntries
   */
  export type ProgramElement$journalEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    where?: JournalEntryWhereInput
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    cursor?: JournalEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * ProgramElement without action
   */
  export type ProgramElementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
  }


  /**
   * Model Child
   */

  export type AggregateChild = {
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  export type ChildAvgAggregateOutputType = {
    age: number | null
  }

  export type ChildSumAggregateOutputType = {
    age: number | null
  }

  export type ChildMinAggregateOutputType = {
    id: string | null
    name: string | null
    firstName: string | null
    age: number | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    programId: string | null
  }

  export type ChildMaxAggregateOutputType = {
    id: string | null
    name: string | null
    firstName: string | null
    age: number | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    programId: string | null
  }

  export type ChildCountAggregateOutputType = {
    id: number
    name: number
    firstName: number
    age: number
    gender: number
    birthDate: number
    programId: number
    _all: number
  }


  export type ChildAvgAggregateInputType = {
    age?: true
  }

  export type ChildSumAggregateInputType = {
    age?: true
  }

  export type ChildMinAggregateInputType = {
    id?: true
    name?: true
    firstName?: true
    age?: true
    gender?: true
    birthDate?: true
    programId?: true
  }

  export type ChildMaxAggregateInputType = {
    id?: true
    name?: true
    firstName?: true
    age?: true
    gender?: true
    birthDate?: true
    programId?: true
  }

  export type ChildCountAggregateInputType = {
    id?: true
    name?: true
    firstName?: true
    age?: true
    gender?: true
    birthDate?: true
    programId?: true
    _all?: true
  }

  export type ChildAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Child to aggregate.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Children
    **/
    _count?: true | ChildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChildAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChildSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChildMaxAggregateInputType
  }

  export type GetChildAggregateType<T extends ChildAggregateArgs> = {
        [P in keyof T & keyof AggregateChild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChild[P]>
      : GetScalarType<T[P], AggregateChild[P]>
  }




  export type ChildGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: ChildWhereInput
    orderBy?: ChildOrderByWithAggregationInput | ChildOrderByWithAggregationInput[]
    by: ChildScalarFieldEnum[] | ChildScalarFieldEnum
    having?: ChildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChildCountAggregateInputType | true
    _avg?: ChildAvgAggregateInputType
    _sum?: ChildSumAggregateInputType
    _min?: ChildMinAggregateInputType
    _max?: ChildMaxAggregateInputType
  }

  export type ChildGroupByOutputType = {
    id: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date
    programId: string
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  type GetChildGroupByPayload<T extends ChildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChildGroupByOutputType[P]>
            : GetScalarType<T[P], ChildGroupByOutputType[P]>
        }
      >
    >


  export type ChildSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    firstName?: boolean
    age?: boolean
    gender?: boolean
    birthDate?: boolean
    programId?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    journalEntries?: boolean | Child$journalEntriesArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    firstName?: boolean
    age?: boolean
    gender?: boolean
    birthDate?: boolean
    programId?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    firstName?: boolean
    age?: boolean
    gender?: boolean
    birthDate?: boolean
    programId?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectScalar = {
    id?: boolean
    name?: boolean
    firstName?: boolean
    age?: boolean
    gender?: boolean
    birthDate?: boolean
    programId?: boolean
  }

  export type ChildOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "firstName" | "age" | "gender" | "birthDate" | "programId", ExtArgs["result"]["child"]>
  export type ChildInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
    journalEntries?: boolean | Child$journalEntriesArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChildIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }
  export type ChildIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }

  export type $ChildPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Child"
    objects: {
      program: Prisma.$ProgramPayload<ExtArgs>
      journalEntries: Prisma.$JournalEntryPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      name: string
      firstName: string
      age: number
      gender: $Enums.Gender
      birthDate: Date
      programId: string
    }, ExtArgs["result"]["child"]>
    composites: {}
  }

  export type ChildGetPayload<S extends boolean | null | undefined | ChildDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChildPayload, S>

  export type ChildCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<ChildFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChildCountAggregateInputType | true
    }

  export interface ChildDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Child'], meta: { name: 'Child' } }
    /**
     * Find zero or one Child that matches the filter.
     * @param {ChildFindUniqueArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChildFindUniqueArgs>(args: SelectSubset<T, ChildFindUniqueArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Child that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChildFindUniqueOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChildFindUniqueOrThrowArgs>(args: SelectSubset<T, ChildFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Child that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChildFindFirstArgs>(args?: SelectSubset<T, ChildFindFirstArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Child that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChildFindFirstOrThrowArgs>(args?: SelectSubset<T, ChildFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Children
     * const children = await prisma.child.findMany()
     * 
     * // Get first 10 Children
     * const children = await prisma.child.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const childWithIdOnly = await prisma.child.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChildFindManyArgs>(args?: SelectSubset<T, ChildFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Child.
     * @param {ChildCreateArgs} args - Arguments to create a Child.
     * @example
     * // Create one Child
     * const Child = await prisma.child.create({
     *   data: {
     *     // ... data to create a Child
     *   }
     * })
     * 
     */
    create<T extends ChildCreateArgs>(args: SelectSubset<T, ChildCreateArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Children.
     * @param {ChildCreateManyArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const child = await prisma.child.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChildCreateManyArgs>(args?: SelectSubset<T, ChildCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Children and returns the data saved in the database.
     * @param {ChildCreateManyAndReturnArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const child = await prisma.child.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Children and only return the `id`
     * const childWithIdOnly = await prisma.child.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChildCreateManyAndReturnArgs>(args?: SelectSubset<T, ChildCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Child.
     * @param {ChildDeleteArgs} args - Arguments to delete one Child.
     * @example
     * // Delete one Child
     * const Child = await prisma.child.delete({
     *   where: {
     *     // ... filter to delete one Child
     *   }
     * })
     * 
     */
    delete<T extends ChildDeleteArgs>(args: SelectSubset<T, ChildDeleteArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Child.
     * @param {ChildUpdateArgs} args - Arguments to update one Child.
     * @example
     * // Update one Child
     * const child = await prisma.child.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChildUpdateArgs>(args: SelectSubset<T, ChildUpdateArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Children.
     * @param {ChildDeleteManyArgs} args - Arguments to filter Children to delete.
     * @example
     * // Delete a few Children
     * const { count } = await prisma.child.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChildDeleteManyArgs>(args?: SelectSubset<T, ChildDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Children
     * const child = await prisma.child.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChildUpdateManyArgs>(args: SelectSubset<T, ChildUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children and returns the data updated in the database.
     * @param {ChildUpdateManyAndReturnArgs} args - Arguments to update many Children.
     * @example
     * // Update many Children
     * const child = await prisma.child.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Children and only return the `id`
     * const childWithIdOnly = await prisma.child.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChildUpdateManyAndReturnArgs>(args: SelectSubset<T, ChildUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Child.
     * @param {ChildUpsertArgs} args - Arguments to update or create a Child.
     * @example
     * // Update or create a Child
     * const child = await prisma.child.upsert({
     *   create: {
     *     // ... data to create a Child
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Child we want to update
     *   }
     * })
     */
    upsert<T extends ChildUpsertArgs>(args: SelectSubset<T, ChildUpsertArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildCountArgs} args - Arguments to filter Children to count.
     * @example
     * // Count the number of Children
     * const count = await prisma.child.count({
     *   where: {
     *     // ... the filter for the Children we want to count
     *   }
     * })
    **/
    count<T extends ChildCountArgs>(
      args?: Subset<T, ChildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChildAggregateArgs>(args: Subset<T, ChildAggregateArgs>): Prisma.PrismaPromise<GetChildAggregateType<T>>

    /**
     * Group by Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChildGroupByArgs['orderBy'] }
        : { orderBy?: ChildGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Child model
   */
  readonly fields: ChildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Child.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChildClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    program<T extends ProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramDefaultArgs<ExtArgs>>): Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    journalEntries<T extends Child$journalEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Child$journalEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the Child model
   */
  export interface ChildFieldRefs {
    readonly id: FieldRef<"Child", 'String'>
    readonly name: FieldRef<"Child", 'String'>
    readonly firstName: FieldRef<"Child", 'String'>
    readonly age: FieldRef<"Child", 'Int'>
    readonly gender: FieldRef<"Child", 'Gender'>
    readonly birthDate: FieldRef<"Child", 'DateTime'>
    readonly programId: FieldRef<"Child", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Child findUnique
   */
  export type ChildFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child findUniqueOrThrow
   */
  export type ChildFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child findFirst
   */
  export type ChildFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child findFirstOrThrow
   */
  export type ChildFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child findMany
   */
  export type ChildFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }

  /**
   * Child create
   */
  export type ChildCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to create a Child.
     */
    data: XOR<ChildCreateInput, ChildUncheckedCreateInput>
  }

  /**
   * Child createMany
   */
  export type ChildCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Child createManyAndReturn
   */
  export type ChildCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Child update
   */
  export type ChildUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to update a Child.
     */
    data: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
    /**
     * Choose, which Child to update.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child updateMany
   */
  export type ChildUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Children.
     */
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildWhereInput
    /**
     * Limit how many Children to update.
     */
    limit?: number
  }

  /**
   * Child updateManyAndReturn
   */
  export type ChildUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * The data used to update Children.
     */
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildWhereInput
    /**
     * Limit how many Children to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Child upsert
   */
  export type ChildUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The filter to search for the Child to update in case it exists.
     */
    where: ChildWhereUniqueInput
    /**
     * In case the Child found by the `where` argument doesn't exist, create a new Child with this data.
     */
    create: XOR<ChildCreateInput, ChildUncheckedCreateInput>
    /**
     * In case the Child was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
  }

  /**
   * Child delete
   */
  export type ChildDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter which Child to delete.
     */
    where: ChildWhereUniqueInput
  }

  /**
   * Child deleteMany
   */
  export type ChildDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Children to delete
     */
    where?: ChildWhereInput
    /**
     * Limit how many Children to delete.
     */
    limit?: number
  }

  /**
   * Child.journalEntries
   */
  export type Child$journalEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    where?: JournalEntryWhereInput
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    cursor?: JournalEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * Child without action
   */
  export type ChildDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Child
     */
    omit?: ChildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildInclude<ExtArgs> | null
  }


  /**
   * Model JournalEntry
   */

  export type AggregateJournalEntry = {
    _count: JournalEntryCountAggregateOutputType | null
    _min: JournalEntryMinAggregateOutputType | null
    _max: JournalEntryMaxAggregateOutputType | null
  }

  export type JournalEntryMinAggregateOutputType = {
    id: string | null
    date: Date | null
    comment: string | null
    childId: string | null
  }

  export type JournalEntryMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    comment: string | null
    childId: string | null
  }

  export type JournalEntryCountAggregateOutputType = {
    id: number
    date: number
    comment: number
    images: number
    childId: number
    _all: number
  }


  export type JournalEntryMinAggregateInputType = {
    id?: true
    date?: true
    comment?: true
    childId?: true
  }

  export type JournalEntryMaxAggregateInputType = {
    id?: true
    date?: true
    comment?: true
    childId?: true
  }

  export type JournalEntryCountAggregateInputType = {
    id?: true
    date?: true
    comment?: true
    images?: true
    childId?: true
    _all?: true
  }

  export type JournalEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which JournalEntry to aggregate.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JournalEntries
    **/
    _count?: true | JournalEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JournalEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JournalEntryMaxAggregateInputType
  }

  export type GetJournalEntryAggregateType<T extends JournalEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateJournalEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJournalEntry[P]>
      : GetScalarType<T[P], AggregateJournalEntry[P]>
  }




  export type JournalEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: JournalEntryWhereInput
    orderBy?: JournalEntryOrderByWithAggregationInput | JournalEntryOrderByWithAggregationInput[]
    by: JournalEntryScalarFieldEnum[] | JournalEntryScalarFieldEnum
    having?: JournalEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JournalEntryCountAggregateInputType | true
    _min?: JournalEntryMinAggregateInputType
    _max?: JournalEntryMaxAggregateInputType
  }

  export type JournalEntryGroupByOutputType = {
    id: string
    date: Date
    comment: string
    images: string[]
    childId: string
    _count: JournalEntryCountAggregateOutputType | null
    _min: JournalEntryMinAggregateOutputType | null
    _max: JournalEntryMaxAggregateOutputType | null
  }

  type GetJournalEntryGroupByPayload<T extends JournalEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JournalEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JournalEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JournalEntryGroupByOutputType[P]>
            : GetScalarType<T[P], JournalEntryGroupByOutputType[P]>
        }
      >
    >


  export type JournalEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    comment?: boolean
    images?: boolean
    childId?: boolean
    validatedElements?: boolean | JournalEntry$validatedElementsArgs<ExtArgs>
    child?: boolean | ChildDefaultArgs<ExtArgs>
    _count?: boolean | JournalEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["journalEntry"]>

  export type JournalEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    comment?: boolean
    images?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["journalEntry"]>

  export type JournalEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    comment?: boolean
    images?: boolean
    childId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["journalEntry"]>

  export type JournalEntrySelectScalar = {
    id?: boolean
    date?: boolean
    comment?: boolean
    images?: boolean
    childId?: boolean
  }

  export type JournalEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "date" | "comment" | "images" | "childId", ExtArgs["result"]["journalEntry"]>
  export type JournalEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    validatedElements?: boolean | JournalEntry$validatedElementsArgs<ExtArgs>
    child?: boolean | ChildDefaultArgs<ExtArgs>
    _count?: boolean | JournalEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JournalEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }
  export type JournalEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
  }

  export type $JournalEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JournalEntry"
    objects: {
      validatedElements: Prisma.$ProgramElementPayload<ExtArgs>[]
      child: Prisma.$ChildPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: string
      date: Date
      comment: string
      images: string[]
      childId: string
    }, ExtArgs["result"]["journalEntry"]>
    composites: {}
  }

  export type JournalEntryGetPayload<S extends boolean | null | undefined | JournalEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload, S>

  export type JournalEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<JournalEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JournalEntryCountAggregateInputType | true
    }

  export interface JournalEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JournalEntry'], meta: { name: 'JournalEntry' } }
    /**
     * Find zero or one JournalEntry that matches the filter.
     * @param {JournalEntryFindUniqueArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JournalEntryFindUniqueArgs>(args: SelectSubset<T, JournalEntryFindUniqueArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JournalEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JournalEntryFindUniqueOrThrowArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JournalEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, JournalEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JournalEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryFindFirstArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JournalEntryFindFirstArgs>(args?: SelectSubset<T, JournalEntryFindFirstArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JournalEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryFindFirstOrThrowArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JournalEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, JournalEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JournalEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JournalEntries
     * const journalEntries = await prisma.journalEntry.findMany()
     * 
     * // Get first 10 JournalEntries
     * const journalEntries = await prisma.journalEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const journalEntryWithIdOnly = await prisma.journalEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JournalEntryFindManyArgs>(args?: SelectSubset<T, JournalEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JournalEntry.
     * @param {JournalEntryCreateArgs} args - Arguments to create a JournalEntry.
     * @example
     * // Create one JournalEntry
     * const JournalEntry = await prisma.journalEntry.create({
     *   data: {
     *     // ... data to create a JournalEntry
     *   }
     * })
     * 
     */
    create<T extends JournalEntryCreateArgs>(args: SelectSubset<T, JournalEntryCreateArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JournalEntries.
     * @param {JournalEntryCreateManyArgs} args - Arguments to create many JournalEntries.
     * @example
     * // Create many JournalEntries
     * const journalEntry = await prisma.journalEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JournalEntryCreateManyArgs>(args?: SelectSubset<T, JournalEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JournalEntries and returns the data saved in the database.
     * @param {JournalEntryCreateManyAndReturnArgs} args - Arguments to create many JournalEntries.
     * @example
     * // Create many JournalEntries
     * const journalEntry = await prisma.journalEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JournalEntries and only return the `id`
     * const journalEntryWithIdOnly = await prisma.journalEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JournalEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, JournalEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JournalEntry.
     * @param {JournalEntryDeleteArgs} args - Arguments to delete one JournalEntry.
     * @example
     * // Delete one JournalEntry
     * const JournalEntry = await prisma.journalEntry.delete({
     *   where: {
     *     // ... filter to delete one JournalEntry
     *   }
     * })
     * 
     */
    delete<T extends JournalEntryDeleteArgs>(args: SelectSubset<T, JournalEntryDeleteArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JournalEntry.
     * @param {JournalEntryUpdateArgs} args - Arguments to update one JournalEntry.
     * @example
     * // Update one JournalEntry
     * const journalEntry = await prisma.journalEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JournalEntryUpdateArgs>(args: SelectSubset<T, JournalEntryUpdateArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JournalEntries.
     * @param {JournalEntryDeleteManyArgs} args - Arguments to filter JournalEntries to delete.
     * @example
     * // Delete a few JournalEntries
     * const { count } = await prisma.journalEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JournalEntryDeleteManyArgs>(args?: SelectSubset<T, JournalEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JournalEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JournalEntries
     * const journalEntry = await prisma.journalEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JournalEntryUpdateManyArgs>(args: SelectSubset<T, JournalEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JournalEntries and returns the data updated in the database.
     * @param {JournalEntryUpdateManyAndReturnArgs} args - Arguments to update many JournalEntries.
     * @example
     * // Update many JournalEntries
     * const journalEntry = await prisma.journalEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JournalEntries and only return the `id`
     * const journalEntryWithIdOnly = await prisma.journalEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JournalEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, JournalEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JournalEntry.
     * @param {JournalEntryUpsertArgs} args - Arguments to update or create a JournalEntry.
     * @example
     * // Update or create a JournalEntry
     * const journalEntry = await prisma.journalEntry.upsert({
     *   create: {
     *     // ... data to create a JournalEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JournalEntry we want to update
     *   }
     * })
     */
    upsert<T extends JournalEntryUpsertArgs>(args: SelectSubset<T, JournalEntryUpsertArgs<ExtArgs>>): Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JournalEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryCountArgs} args - Arguments to filter JournalEntries to count.
     * @example
     * // Count the number of JournalEntries
     * const count = await prisma.journalEntry.count({
     *   where: {
     *     // ... the filter for the JournalEntries we want to count
     *   }
     * })
    **/
    count<T extends JournalEntryCountArgs>(
      args?: Subset<T, JournalEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JournalEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JournalEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JournalEntryAggregateArgs>(args: Subset<T, JournalEntryAggregateArgs>): Prisma.PrismaPromise<GetJournalEntryAggregateType<T>>

    /**
     * Group by JournalEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JournalEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JournalEntryGroupByArgs['orderBy'] }
        : { orderBy?: JournalEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JournalEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJournalEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JournalEntry model
   */
  readonly fields: JournalEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JournalEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JournalEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    validatedElements<T extends JournalEntry$validatedElementsArgs<ExtArgs> = {}>(args?: Subset<T, JournalEntry$validatedElementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<runtime.Types.Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the JournalEntry model
   */
  export interface JournalEntryFieldRefs {
    readonly id: FieldRef<"JournalEntry", 'String'>
    readonly date: FieldRef<"JournalEntry", 'DateTime'>
    readonly comment: FieldRef<"JournalEntry", 'String'>
    readonly images: FieldRef<"JournalEntry", 'String[]'>
    readonly childId: FieldRef<"JournalEntry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JournalEntry findUnique
   */
  export type JournalEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry findUniqueOrThrow
   */
  export type JournalEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry findFirst
   */
  export type JournalEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JournalEntries.
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JournalEntries.
     */
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * JournalEntry findFirstOrThrow
   */
  export type JournalEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JournalEntries.
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JournalEntries.
     */
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * JournalEntry findMany
   */
  export type JournalEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntries to fetch.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JournalEntries.
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * JournalEntry create
   */
  export type JournalEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a JournalEntry.
     */
    data: XOR<JournalEntryCreateInput, JournalEntryUncheckedCreateInput>
  }

  /**
   * JournalEntry createMany
   */
  export type JournalEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many JournalEntries.
     */
    data: JournalEntryCreateManyInput | JournalEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JournalEntry createManyAndReturn
   */
  export type JournalEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * The data used to create many JournalEntries.
     */
    data: JournalEntryCreateManyInput | JournalEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JournalEntry update
   */
  export type JournalEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a JournalEntry.
     */
    data: XOR<JournalEntryUpdateInput, JournalEntryUncheckedUpdateInput>
    /**
     * Choose, which JournalEntry to update.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry updateMany
   */
  export type JournalEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update JournalEntries.
     */
    data: XOR<JournalEntryUpdateManyMutationInput, JournalEntryUncheckedUpdateManyInput>
    /**
     * Filter which JournalEntries to update
     */
    where?: JournalEntryWhereInput
    /**
     * Limit how many JournalEntries to update.
     */
    limit?: number
  }

  /**
   * JournalEntry updateManyAndReturn
   */
  export type JournalEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * The data used to update JournalEntries.
     */
    data: XOR<JournalEntryUpdateManyMutationInput, JournalEntryUncheckedUpdateManyInput>
    /**
     * Filter which JournalEntries to update
     */
    where?: JournalEntryWhereInput
    /**
     * Limit how many JournalEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JournalEntry upsert
   */
  export type JournalEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the JournalEntry to update in case it exists.
     */
    where: JournalEntryWhereUniqueInput
    /**
     * In case the JournalEntry found by the `where` argument doesn't exist, create a new JournalEntry with this data.
     */
    create: XOR<JournalEntryCreateInput, JournalEntryUncheckedCreateInput>
    /**
     * In case the JournalEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JournalEntryUpdateInput, JournalEntryUncheckedUpdateInput>
  }

  /**
   * JournalEntry delete
   */
  export type JournalEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter which JournalEntry to delete.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry deleteMany
   */
  export type JournalEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which JournalEntries to delete
     */
    where?: JournalEntryWhereInput
    /**
     * Limit how many JournalEntries to delete.
     */
    limit?: number
  }

  /**
   * JournalEntry.validatedElements
   */
  export type JournalEntry$validatedElementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramElement
     */
    select?: ProgramElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramElement
     */
    omit?: ProgramElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramElementInclude<ExtArgs> | null
    where?: ProgramElementWhereInput
    orderBy?: ProgramElementOrderByWithRelationInput | ProgramElementOrderByWithRelationInput[]
    cursor?: ProgramElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramElementScalarFieldEnum | ProgramElementScalarFieldEnum[]
  }

  /**
   * JournalEntry without action
   */
  export type JournalEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  } as const)

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const KeyValuePairsScalarFieldEnum = {
    scope: 'scope',
    key: 'key',
    value: 'value'
  } as const

  export type KeyValuePairsScalarFieldEnum = (typeof KeyValuePairsScalarFieldEnum)[keyof typeof KeyValuePairsScalarFieldEnum]


  export const ProgramScalarFieldEnum = {
    id: 'id',
    name: 'name',
    grade: 'grade'
  } as const

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const ProgramElementScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    programId: 'programId'
  } as const

  export type ProgramElementScalarFieldEnum = (typeof ProgramElementScalarFieldEnum)[keyof typeof ProgramElementScalarFieldEnum]


  export const ChildScalarFieldEnum = {
    id: 'id',
    name: 'name',
    firstName: 'firstName',
    age: 'age',
    gender: 'gender',
    birthDate: 'birthDate',
    programId: 'programId'
  } as const

  export type ChildScalarFieldEnum = (typeof ChildScalarFieldEnum)[keyof typeof ChildScalarFieldEnum]


  export const JournalEntryScalarFieldEnum = {
    id: 'id',
    date: 'date',
    comment: 'comment',
    images: 'images',
    childId: 'childId'
  } as const

  export type JournalEntryScalarFieldEnum = (typeof JournalEntryScalarFieldEnum)[keyof typeof JournalEntryScalarFieldEnum]


  export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
  } as const

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
  } as const

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'Grade'
   */
  export type EnumGradeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Grade'>
    


  /**
   * Reference to a field of type 'Grade[]'
   */
  export type ListEnumGradeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Grade[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type KeyValuePairsWhereInput = {
    AND?: KeyValuePairsWhereInput | KeyValuePairsWhereInput[]
    OR?: KeyValuePairsWhereInput[]
    NOT?: KeyValuePairsWhereInput | KeyValuePairsWhereInput[]
    scope?: StringFilter<"KeyValuePairs"> | string
    key?: StringFilter<"KeyValuePairs"> | string
    value?: BytesFilter<"KeyValuePairs"> | Uint8Array
  }

  export type KeyValuePairsOrderByWithRelationInput = {
    scope?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type KeyValuePairsWhereUniqueInput = Prisma.AtLeast<{
    scope_key?: KeyValuePairsScopeKeyCompoundUniqueInput
    AND?: KeyValuePairsWhereInput | KeyValuePairsWhereInput[]
    OR?: KeyValuePairsWhereInput[]
    NOT?: KeyValuePairsWhereInput | KeyValuePairsWhereInput[]
    scope?: StringFilter<"KeyValuePairs"> | string
    key?: StringFilter<"KeyValuePairs"> | string
    value?: BytesFilter<"KeyValuePairs"> | Uint8Array
  }, "scope_key">

  export type KeyValuePairsOrderByWithAggregationInput = {
    scope?: SortOrder
    key?: SortOrder
    value?: SortOrder
    _count?: KeyValuePairsCountOrderByAggregateInput
    _max?: KeyValuePairsMaxOrderByAggregateInput
    _min?: KeyValuePairsMinOrderByAggregateInput
  }

  export type KeyValuePairsScalarWhereWithAggregatesInput = {
    AND?: KeyValuePairsScalarWhereWithAggregatesInput | KeyValuePairsScalarWhereWithAggregatesInput[]
    OR?: KeyValuePairsScalarWhereWithAggregatesInput[]
    NOT?: KeyValuePairsScalarWhereWithAggregatesInput | KeyValuePairsScalarWhereWithAggregatesInput[]
    scope?: StringWithAggregatesFilter<"KeyValuePairs"> | string
    key?: StringWithAggregatesFilter<"KeyValuePairs"> | string
    value?: BytesWithAggregatesFilter<"KeyValuePairs"> | Uint8Array
  }

  export type ProgramWhereInput = {
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    id?: StringFilter<"Program"> | string
    name?: StringFilter<"Program"> | string
    grade?: EnumGradeFilter<"Program"> | $Enums.Grade
    elements?: ProgramElementListRelationFilter
    children?: ChildListRelationFilter
  }

  export type ProgramOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    grade?: SortOrder
    elements?: ProgramElementOrderByRelationAggregateInput
    children?: ChildOrderByRelationAggregateInput
  }

  export type ProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    name?: StringFilter<"Program"> | string
    grade?: EnumGradeFilter<"Program"> | $Enums.Grade
    elements?: ProgramElementListRelationFilter
    children?: ChildListRelationFilter
  }, "id">

  export type ProgramOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    grade?: SortOrder
    _count?: ProgramCountOrderByAggregateInput
    _max?: ProgramMaxOrderByAggregateInput
    _min?: ProgramMinOrderByAggregateInput
  }

  export type ProgramScalarWhereWithAggregatesInput = {
    AND?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    OR?: ProgramScalarWhereWithAggregatesInput[]
    NOT?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Program"> | string
    name?: StringWithAggregatesFilter<"Program"> | string
    grade?: EnumGradeWithAggregatesFilter<"Program"> | $Enums.Grade
  }

  export type ProgramElementWhereInput = {
    AND?: ProgramElementWhereInput | ProgramElementWhereInput[]
    OR?: ProgramElementWhereInput[]
    NOT?: ProgramElementWhereInput | ProgramElementWhereInput[]
    id?: StringFilter<"ProgramElement"> | string
    name?: StringFilter<"ProgramElement"> | string
    description?: StringFilter<"ProgramElement"> | string
    programId?: StringFilter<"ProgramElement"> | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
    journalEntries?: JournalEntryListRelationFilter
  }

  export type ProgramElementOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    programId?: SortOrder
    program?: ProgramOrderByWithRelationInput
    journalEntries?: JournalEntryOrderByRelationAggregateInput
  }

  export type ProgramElementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramElementWhereInput | ProgramElementWhereInput[]
    OR?: ProgramElementWhereInput[]
    NOT?: ProgramElementWhereInput | ProgramElementWhereInput[]
    name?: StringFilter<"ProgramElement"> | string
    description?: StringFilter<"ProgramElement"> | string
    programId?: StringFilter<"ProgramElement"> | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
    journalEntries?: JournalEntryListRelationFilter
  }, "id">

  export type ProgramElementOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    programId?: SortOrder
    _count?: ProgramElementCountOrderByAggregateInput
    _max?: ProgramElementMaxOrderByAggregateInput
    _min?: ProgramElementMinOrderByAggregateInput
  }

  export type ProgramElementScalarWhereWithAggregatesInput = {
    AND?: ProgramElementScalarWhereWithAggregatesInput | ProgramElementScalarWhereWithAggregatesInput[]
    OR?: ProgramElementScalarWhereWithAggregatesInput[]
    NOT?: ProgramElementScalarWhereWithAggregatesInput | ProgramElementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProgramElement"> | string
    name?: StringWithAggregatesFilter<"ProgramElement"> | string
    description?: StringWithAggregatesFilter<"ProgramElement"> | string
    programId?: StringWithAggregatesFilter<"ProgramElement"> | string
  }

  export type ChildWhereInput = {
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    id?: StringFilter<"Child"> | string
    name?: StringFilter<"Child"> | string
    firstName?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    gender?: EnumGenderFilter<"Child"> | $Enums.Gender
    birthDate?: DateTimeFilter<"Child"> | Date | string
    programId?: StringFilter<"Child"> | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
    journalEntries?: JournalEntryListRelationFilter
  }

  export type ChildOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    programId?: SortOrder
    program?: ProgramOrderByWithRelationInput
    journalEntries?: JournalEntryOrderByRelationAggregateInput
  }

  export type ChildWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    name?: StringFilter<"Child"> | string
    firstName?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    gender?: EnumGenderFilter<"Child"> | $Enums.Gender
    birthDate?: DateTimeFilter<"Child"> | Date | string
    programId?: StringFilter<"Child"> | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
    journalEntries?: JournalEntryListRelationFilter
  }, "id">

  export type ChildOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    programId?: SortOrder
    _count?: ChildCountOrderByAggregateInput
    _avg?: ChildAvgOrderByAggregateInput
    _max?: ChildMaxOrderByAggregateInput
    _min?: ChildMinOrderByAggregateInput
    _sum?: ChildSumOrderByAggregateInput
  }

  export type ChildScalarWhereWithAggregatesInput = {
    AND?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    OR?: ChildScalarWhereWithAggregatesInput[]
    NOT?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Child"> | string
    name?: StringWithAggregatesFilter<"Child"> | string
    firstName?: StringWithAggregatesFilter<"Child"> | string
    age?: IntWithAggregatesFilter<"Child"> | number
    gender?: EnumGenderWithAggregatesFilter<"Child"> | $Enums.Gender
    birthDate?: DateTimeWithAggregatesFilter<"Child"> | Date | string
    programId?: StringWithAggregatesFilter<"Child"> | string
  }

  export type JournalEntryWhereInput = {
    AND?: JournalEntryWhereInput | JournalEntryWhereInput[]
    OR?: JournalEntryWhereInput[]
    NOT?: JournalEntryWhereInput | JournalEntryWhereInput[]
    id?: StringFilter<"JournalEntry"> | string
    date?: DateTimeFilter<"JournalEntry"> | Date | string
    comment?: StringFilter<"JournalEntry"> | string
    images?: StringNullableListFilter<"JournalEntry">
    childId?: StringFilter<"JournalEntry"> | string
    validatedElements?: ProgramElementListRelationFilter
    child?: XOR<ChildScalarRelationFilter, ChildWhereInput>
  }

  export type JournalEntryOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    comment?: SortOrder
    images?: SortOrder
    childId?: SortOrder
    validatedElements?: ProgramElementOrderByRelationAggregateInput
    child?: ChildOrderByWithRelationInput
  }

  export type JournalEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JournalEntryWhereInput | JournalEntryWhereInput[]
    OR?: JournalEntryWhereInput[]
    NOT?: JournalEntryWhereInput | JournalEntryWhereInput[]
    date?: DateTimeFilter<"JournalEntry"> | Date | string
    comment?: StringFilter<"JournalEntry"> | string
    images?: StringNullableListFilter<"JournalEntry">
    childId?: StringFilter<"JournalEntry"> | string
    validatedElements?: ProgramElementListRelationFilter
    child?: XOR<ChildScalarRelationFilter, ChildWhereInput>
  }, "id">

  export type JournalEntryOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    comment?: SortOrder
    images?: SortOrder
    childId?: SortOrder
    _count?: JournalEntryCountOrderByAggregateInput
    _max?: JournalEntryMaxOrderByAggregateInput
    _min?: JournalEntryMinOrderByAggregateInput
  }

  export type JournalEntryScalarWhereWithAggregatesInput = {
    AND?: JournalEntryScalarWhereWithAggregatesInput | JournalEntryScalarWhereWithAggregatesInput[]
    OR?: JournalEntryScalarWhereWithAggregatesInput[]
    NOT?: JournalEntryScalarWhereWithAggregatesInput | JournalEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JournalEntry"> | string
    date?: DateTimeWithAggregatesFilter<"JournalEntry"> | Date | string
    comment?: StringWithAggregatesFilter<"JournalEntry"> | string
    images?: StringNullableListFilter<"JournalEntry">
    childId?: StringWithAggregatesFilter<"JournalEntry"> | string
  }

  export type KeyValuePairsCreateInput = {
    scope: string
    key: string
    value: Uint8Array
  }

  export type KeyValuePairsUncheckedCreateInput = {
    scope: string
    key: string
    value: Uint8Array
  }

  export type KeyValuePairsUpdateInput = {
    scope?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type KeyValuePairsUncheckedUpdateInput = {
    scope?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type KeyValuePairsCreateManyInput = {
    scope: string
    key: string
    value: Uint8Array
  }

  export type KeyValuePairsUpdateManyMutationInput = {
    scope?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type KeyValuePairsUncheckedUpdateManyInput = {
    scope?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type ProgramCreateInput = {
    id?: string
    name: string
    grade: $Enums.Grade
    elements?: ProgramElementCreateNestedManyWithoutProgramInput
    children?: ChildCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateInput = {
    id?: string
    name: string
    grade: $Enums.Grade
    elements?: ProgramElementUncheckedCreateNestedManyWithoutProgramInput
    children?: ChildUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    elements?: ProgramElementUpdateManyWithoutProgramNestedInput
    children?: ChildUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    elements?: ProgramElementUncheckedUpdateManyWithoutProgramNestedInput
    children?: ChildUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramCreateManyInput = {
    id?: string
    name: string
    grade: $Enums.Grade
  }

  export type ProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
  }

  export type ProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
  }

  export type ProgramElementCreateInput = {
    id?: string
    name: string
    description: string
    program: ProgramCreateNestedOneWithoutElementsInput
    journalEntries?: JournalEntryCreateNestedManyWithoutValidatedElementsInput
  }

  export type ProgramElementUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    programId: string
    journalEntries?: JournalEntryUncheckedCreateNestedManyWithoutValidatedElementsInput
  }

  export type ProgramElementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    program?: ProgramUpdateOneRequiredWithoutElementsNestedInput
    journalEntries?: JournalEntryUpdateManyWithoutValidatedElementsNestedInput
  }

  export type ProgramElementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    journalEntries?: JournalEntryUncheckedUpdateManyWithoutValidatedElementsNestedInput
  }

  export type ProgramElementCreateManyInput = {
    id?: string
    name: string
    description: string
    programId: string
  }

  export type ProgramElementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type ProgramElementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
  }

  export type ChildCreateInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    program: ProgramCreateNestedOneWithoutChildrenInput
    journalEntries?: JournalEntryCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    programId: string
    journalEntries?: JournalEntryUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutChildrenNestedInput
    journalEntries?: JournalEntryUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    programId?: StringFieldUpdateOperationsInput | string
    journalEntries?: JournalEntryUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildCreateManyInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    programId: string
  }

  export type ChildUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    programId?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEntryCreateInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    validatedElements?: ProgramElementCreateNestedManyWithoutJournalEntriesInput
    child: ChildCreateNestedOneWithoutJournalEntriesInput
  }

  export type JournalEntryUncheckedCreateInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    childId: string
    validatedElements?: ProgramElementUncheckedCreateNestedManyWithoutJournalEntriesInput
  }

  export type JournalEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    validatedElements?: ProgramElementUpdateManyWithoutJournalEntriesNestedInput
    child?: ChildUpdateOneRequiredWithoutJournalEntriesNestedInput
  }

  export type JournalEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    childId?: StringFieldUpdateOperationsInput | string
    validatedElements?: ProgramElementUncheckedUpdateManyWithoutJournalEntriesNestedInput
  }

  export type JournalEntryCreateManyInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    childId: string
  }

  export type JournalEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
  }

  export type JournalEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type KeyValuePairsScopeKeyCompoundUniqueInput = {
    scope: string
    key: string
  }

  export type KeyValuePairsCountOrderByAggregateInput = {
    scope?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type KeyValuePairsMaxOrderByAggregateInput = {
    scope?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type KeyValuePairsMinOrderByAggregateInput = {
    scope?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type EnumGradeFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeFilter<$PrismaModel> | $Enums.Grade
  }

  export type ProgramElementListRelationFilter = {
    every?: ProgramElementWhereInput
    some?: ProgramElementWhereInput
    none?: ProgramElementWhereInput
  }

  export type ChildListRelationFilter = {
    every?: ChildWhereInput
    some?: ChildWhereInput
    none?: ChildWhereInput
  }

  export type ProgramElementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChildOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    grade?: SortOrder
  }

  export type ProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    grade?: SortOrder
  }

  export type ProgramMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    grade?: SortOrder
  }

  export type EnumGradeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeWithAggregatesFilter<$PrismaModel> | $Enums.Grade
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradeFilter<$PrismaModel>
    _max?: NestedEnumGradeFilter<$PrismaModel>
  }

  export type ProgramScalarRelationFilter = {
    is?: ProgramWhereInput
    isNot?: ProgramWhereInput
  }

  export type JournalEntryListRelationFilter = {
    every?: JournalEntryWhereInput
    some?: JournalEntryWhereInput
    none?: JournalEntryWhereInput
  }

  export type JournalEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramElementCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    programId?: SortOrder
  }

  export type ProgramElementMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    programId?: SortOrder
  }

  export type ProgramElementMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    programId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChildCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    programId?: SortOrder
  }

  export type ChildAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type ChildMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    programId?: SortOrder
  }

  export type ChildMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    firstName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    programId?: SortOrder
  }

  export type ChildSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ChildScalarRelationFilter = {
    is?: ChildWhereInput
    isNot?: ChildWhereInput
  }

  export type JournalEntryCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    comment?: SortOrder
    images?: SortOrder
    childId?: SortOrder
  }

  export type JournalEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    comment?: SortOrder
    childId?: SortOrder
  }

  export type JournalEntryMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    comment?: SortOrder
    childId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Uint8Array
  }

  export type ProgramElementCreateNestedManyWithoutProgramInput = {
    create?: XOR<ProgramElementCreateWithoutProgramInput, ProgramElementUncheckedCreateWithoutProgramInput> | ProgramElementCreateWithoutProgramInput[] | ProgramElementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutProgramInput | ProgramElementCreateOrConnectWithoutProgramInput[]
    createMany?: ProgramElementCreateManyProgramInputEnvelope
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
  }

  export type ChildCreateNestedManyWithoutProgramInput = {
    create?: XOR<ChildCreateWithoutProgramInput, ChildUncheckedCreateWithoutProgramInput> | ChildCreateWithoutProgramInput[] | ChildUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutProgramInput | ChildCreateOrConnectWithoutProgramInput[]
    createMany?: ChildCreateManyProgramInputEnvelope
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
  }

  export type ProgramElementUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<ProgramElementCreateWithoutProgramInput, ProgramElementUncheckedCreateWithoutProgramInput> | ProgramElementCreateWithoutProgramInput[] | ProgramElementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutProgramInput | ProgramElementCreateOrConnectWithoutProgramInput[]
    createMany?: ProgramElementCreateManyProgramInputEnvelope
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
  }

  export type ChildUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<ChildCreateWithoutProgramInput, ChildUncheckedCreateWithoutProgramInput> | ChildCreateWithoutProgramInput[] | ChildUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutProgramInput | ChildCreateOrConnectWithoutProgramInput[]
    createMany?: ChildCreateManyProgramInputEnvelope
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
  }

  export type EnumGradeFieldUpdateOperationsInput = {
    set?: $Enums.Grade
  }

  export type ProgramElementUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ProgramElementCreateWithoutProgramInput, ProgramElementUncheckedCreateWithoutProgramInput> | ProgramElementCreateWithoutProgramInput[] | ProgramElementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutProgramInput | ProgramElementCreateOrConnectWithoutProgramInput[]
    upsert?: ProgramElementUpsertWithWhereUniqueWithoutProgramInput | ProgramElementUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ProgramElementCreateManyProgramInputEnvelope
    set?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    disconnect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    delete?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    update?: ProgramElementUpdateWithWhereUniqueWithoutProgramInput | ProgramElementUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ProgramElementUpdateManyWithWhereWithoutProgramInput | ProgramElementUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ProgramElementScalarWhereInput | ProgramElementScalarWhereInput[]
  }

  export type ChildUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ChildCreateWithoutProgramInput, ChildUncheckedCreateWithoutProgramInput> | ChildCreateWithoutProgramInput[] | ChildUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutProgramInput | ChildCreateOrConnectWithoutProgramInput[]
    upsert?: ChildUpsertWithWhereUniqueWithoutProgramInput | ChildUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ChildCreateManyProgramInputEnvelope
    set?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    disconnect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    delete?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    update?: ChildUpdateWithWhereUniqueWithoutProgramInput | ChildUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ChildUpdateManyWithWhereWithoutProgramInput | ChildUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ChildScalarWhereInput | ChildScalarWhereInput[]
  }

  export type ProgramElementUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ProgramElementCreateWithoutProgramInput, ProgramElementUncheckedCreateWithoutProgramInput> | ProgramElementCreateWithoutProgramInput[] | ProgramElementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutProgramInput | ProgramElementCreateOrConnectWithoutProgramInput[]
    upsert?: ProgramElementUpsertWithWhereUniqueWithoutProgramInput | ProgramElementUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ProgramElementCreateManyProgramInputEnvelope
    set?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    disconnect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    delete?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    update?: ProgramElementUpdateWithWhereUniqueWithoutProgramInput | ProgramElementUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ProgramElementUpdateManyWithWhereWithoutProgramInput | ProgramElementUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ProgramElementScalarWhereInput | ProgramElementScalarWhereInput[]
  }

  export type ChildUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ChildCreateWithoutProgramInput, ChildUncheckedCreateWithoutProgramInput> | ChildCreateWithoutProgramInput[] | ChildUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ChildCreateOrConnectWithoutProgramInput | ChildCreateOrConnectWithoutProgramInput[]
    upsert?: ChildUpsertWithWhereUniqueWithoutProgramInput | ChildUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ChildCreateManyProgramInputEnvelope
    set?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    disconnect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    delete?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    connect?: ChildWhereUniqueInput | ChildWhereUniqueInput[]
    update?: ChildUpdateWithWhereUniqueWithoutProgramInput | ChildUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ChildUpdateManyWithWhereWithoutProgramInput | ChildUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ChildScalarWhereInput | ChildScalarWhereInput[]
  }

  export type ProgramCreateNestedOneWithoutElementsInput = {
    create?: XOR<ProgramCreateWithoutElementsInput, ProgramUncheckedCreateWithoutElementsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutElementsInput
    connect?: ProgramWhereUniqueInput
  }

  export type JournalEntryCreateNestedManyWithoutValidatedElementsInput = {
    create?: XOR<JournalEntryCreateWithoutValidatedElementsInput, JournalEntryUncheckedCreateWithoutValidatedElementsInput> | JournalEntryCreateWithoutValidatedElementsInput[] | JournalEntryUncheckedCreateWithoutValidatedElementsInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutValidatedElementsInput | JournalEntryCreateOrConnectWithoutValidatedElementsInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
  }

  export type JournalEntryUncheckedCreateNestedManyWithoutValidatedElementsInput = {
    create?: XOR<JournalEntryCreateWithoutValidatedElementsInput, JournalEntryUncheckedCreateWithoutValidatedElementsInput> | JournalEntryCreateWithoutValidatedElementsInput[] | JournalEntryUncheckedCreateWithoutValidatedElementsInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutValidatedElementsInput | JournalEntryCreateOrConnectWithoutValidatedElementsInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
  }

  export type ProgramUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<ProgramCreateWithoutElementsInput, ProgramUncheckedCreateWithoutElementsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutElementsInput
    upsert?: ProgramUpsertWithoutElementsInput
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutElementsInput, ProgramUpdateWithoutElementsInput>, ProgramUncheckedUpdateWithoutElementsInput>
  }

  export type JournalEntryUpdateManyWithoutValidatedElementsNestedInput = {
    create?: XOR<JournalEntryCreateWithoutValidatedElementsInput, JournalEntryUncheckedCreateWithoutValidatedElementsInput> | JournalEntryCreateWithoutValidatedElementsInput[] | JournalEntryUncheckedCreateWithoutValidatedElementsInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutValidatedElementsInput | JournalEntryCreateOrConnectWithoutValidatedElementsInput[]
    upsert?: JournalEntryUpsertWithWhereUniqueWithoutValidatedElementsInput | JournalEntryUpsertWithWhereUniqueWithoutValidatedElementsInput[]
    set?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    disconnect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    delete?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    update?: JournalEntryUpdateWithWhereUniqueWithoutValidatedElementsInput | JournalEntryUpdateWithWhereUniqueWithoutValidatedElementsInput[]
    updateMany?: JournalEntryUpdateManyWithWhereWithoutValidatedElementsInput | JournalEntryUpdateManyWithWhereWithoutValidatedElementsInput[]
    deleteMany?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
  }

  export type JournalEntryUncheckedUpdateManyWithoutValidatedElementsNestedInput = {
    create?: XOR<JournalEntryCreateWithoutValidatedElementsInput, JournalEntryUncheckedCreateWithoutValidatedElementsInput> | JournalEntryCreateWithoutValidatedElementsInput[] | JournalEntryUncheckedCreateWithoutValidatedElementsInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutValidatedElementsInput | JournalEntryCreateOrConnectWithoutValidatedElementsInput[]
    upsert?: JournalEntryUpsertWithWhereUniqueWithoutValidatedElementsInput | JournalEntryUpsertWithWhereUniqueWithoutValidatedElementsInput[]
    set?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    disconnect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    delete?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    update?: JournalEntryUpdateWithWhereUniqueWithoutValidatedElementsInput | JournalEntryUpdateWithWhereUniqueWithoutValidatedElementsInput[]
    updateMany?: JournalEntryUpdateManyWithWhereWithoutValidatedElementsInput | JournalEntryUpdateManyWithWhereWithoutValidatedElementsInput[]
    deleteMany?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
  }

  export type ProgramCreateNestedOneWithoutChildrenInput = {
    create?: XOR<ProgramCreateWithoutChildrenInput, ProgramUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutChildrenInput
    connect?: ProgramWhereUniqueInput
  }

  export type JournalEntryCreateNestedManyWithoutChildInput = {
    create?: XOR<JournalEntryCreateWithoutChildInput, JournalEntryUncheckedCreateWithoutChildInput> | JournalEntryCreateWithoutChildInput[] | JournalEntryUncheckedCreateWithoutChildInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutChildInput | JournalEntryCreateOrConnectWithoutChildInput[]
    createMany?: JournalEntryCreateManyChildInputEnvelope
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
  }

  export type JournalEntryUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<JournalEntryCreateWithoutChildInput, JournalEntryUncheckedCreateWithoutChildInput> | JournalEntryCreateWithoutChildInput[] | JournalEntryUncheckedCreateWithoutChildInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutChildInput | JournalEntryCreateOrConnectWithoutChildInput[]
    createMany?: JournalEntryCreateManyChildInputEnvelope
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProgramUpdateOneRequiredWithoutChildrenNestedInput = {
    create?: XOR<ProgramCreateWithoutChildrenInput, ProgramUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutChildrenInput
    upsert?: ProgramUpsertWithoutChildrenInput
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutChildrenInput, ProgramUpdateWithoutChildrenInput>, ProgramUncheckedUpdateWithoutChildrenInput>
  }

  export type JournalEntryUpdateManyWithoutChildNestedInput = {
    create?: XOR<JournalEntryCreateWithoutChildInput, JournalEntryUncheckedCreateWithoutChildInput> | JournalEntryCreateWithoutChildInput[] | JournalEntryUncheckedCreateWithoutChildInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutChildInput | JournalEntryCreateOrConnectWithoutChildInput[]
    upsert?: JournalEntryUpsertWithWhereUniqueWithoutChildInput | JournalEntryUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: JournalEntryCreateManyChildInputEnvelope
    set?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    disconnect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    delete?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    update?: JournalEntryUpdateWithWhereUniqueWithoutChildInput | JournalEntryUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: JournalEntryUpdateManyWithWhereWithoutChildInput | JournalEntryUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
  }

  export type JournalEntryUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<JournalEntryCreateWithoutChildInput, JournalEntryUncheckedCreateWithoutChildInput> | JournalEntryCreateWithoutChildInput[] | JournalEntryUncheckedCreateWithoutChildInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutChildInput | JournalEntryCreateOrConnectWithoutChildInput[]
    upsert?: JournalEntryUpsertWithWhereUniqueWithoutChildInput | JournalEntryUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: JournalEntryCreateManyChildInputEnvelope
    set?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    disconnect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    delete?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    update?: JournalEntryUpdateWithWhereUniqueWithoutChildInput | JournalEntryUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: JournalEntryUpdateManyWithWhereWithoutChildInput | JournalEntryUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
  }

  export type JournalEntryCreateimagesInput = {
    set: string[]
  }

  export type ProgramElementCreateNestedManyWithoutJournalEntriesInput = {
    create?: XOR<ProgramElementCreateWithoutJournalEntriesInput, ProgramElementUncheckedCreateWithoutJournalEntriesInput> | ProgramElementCreateWithoutJournalEntriesInput[] | ProgramElementUncheckedCreateWithoutJournalEntriesInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutJournalEntriesInput | ProgramElementCreateOrConnectWithoutJournalEntriesInput[]
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
  }

  export type ChildCreateNestedOneWithoutJournalEntriesInput = {
    create?: XOR<ChildCreateWithoutJournalEntriesInput, ChildUncheckedCreateWithoutJournalEntriesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutJournalEntriesInput
    connect?: ChildWhereUniqueInput
  }

  export type ProgramElementUncheckedCreateNestedManyWithoutJournalEntriesInput = {
    create?: XOR<ProgramElementCreateWithoutJournalEntriesInput, ProgramElementUncheckedCreateWithoutJournalEntriesInput> | ProgramElementCreateWithoutJournalEntriesInput[] | ProgramElementUncheckedCreateWithoutJournalEntriesInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutJournalEntriesInput | ProgramElementCreateOrConnectWithoutJournalEntriesInput[]
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
  }

  export type JournalEntryUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProgramElementUpdateManyWithoutJournalEntriesNestedInput = {
    create?: XOR<ProgramElementCreateWithoutJournalEntriesInput, ProgramElementUncheckedCreateWithoutJournalEntriesInput> | ProgramElementCreateWithoutJournalEntriesInput[] | ProgramElementUncheckedCreateWithoutJournalEntriesInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutJournalEntriesInput | ProgramElementCreateOrConnectWithoutJournalEntriesInput[]
    upsert?: ProgramElementUpsertWithWhereUniqueWithoutJournalEntriesInput | ProgramElementUpsertWithWhereUniqueWithoutJournalEntriesInput[]
    set?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    disconnect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    delete?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    update?: ProgramElementUpdateWithWhereUniqueWithoutJournalEntriesInput | ProgramElementUpdateWithWhereUniqueWithoutJournalEntriesInput[]
    updateMany?: ProgramElementUpdateManyWithWhereWithoutJournalEntriesInput | ProgramElementUpdateManyWithWhereWithoutJournalEntriesInput[]
    deleteMany?: ProgramElementScalarWhereInput | ProgramElementScalarWhereInput[]
  }

  export type ChildUpdateOneRequiredWithoutJournalEntriesNestedInput = {
    create?: XOR<ChildCreateWithoutJournalEntriesInput, ChildUncheckedCreateWithoutJournalEntriesInput>
    connectOrCreate?: ChildCreateOrConnectWithoutJournalEntriesInput
    upsert?: ChildUpsertWithoutJournalEntriesInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutJournalEntriesInput, ChildUpdateWithoutJournalEntriesInput>, ChildUncheckedUpdateWithoutJournalEntriesInput>
  }

  export type ProgramElementUncheckedUpdateManyWithoutJournalEntriesNestedInput = {
    create?: XOR<ProgramElementCreateWithoutJournalEntriesInput, ProgramElementUncheckedCreateWithoutJournalEntriesInput> | ProgramElementCreateWithoutJournalEntriesInput[] | ProgramElementUncheckedCreateWithoutJournalEntriesInput[]
    connectOrCreate?: ProgramElementCreateOrConnectWithoutJournalEntriesInput | ProgramElementCreateOrConnectWithoutJournalEntriesInput[]
    upsert?: ProgramElementUpsertWithWhereUniqueWithoutJournalEntriesInput | ProgramElementUpsertWithWhereUniqueWithoutJournalEntriesInput[]
    set?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    disconnect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    delete?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    connect?: ProgramElementWhereUniqueInput | ProgramElementWhereUniqueInput[]
    update?: ProgramElementUpdateWithWhereUniqueWithoutJournalEntriesInput | ProgramElementUpdateWithWhereUniqueWithoutJournalEntriesInput[]
    updateMany?: ProgramElementUpdateManyWithWhereWithoutJournalEntriesInput | ProgramElementUpdateManyWithWhereWithoutJournalEntriesInput[]
    deleteMany?: ProgramElementScalarWhereInput | ProgramElementScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedEnumGradeFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeFilter<$PrismaModel> | $Enums.Grade
  }

  export type NestedEnumGradeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeWithAggregatesFilter<$PrismaModel> | $Enums.Grade
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradeFilter<$PrismaModel>
    _max?: NestedEnumGradeFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProgramElementCreateWithoutProgramInput = {
    id?: string
    name: string
    description: string
    journalEntries?: JournalEntryCreateNestedManyWithoutValidatedElementsInput
  }

  export type ProgramElementUncheckedCreateWithoutProgramInput = {
    id?: string
    name: string
    description: string
    journalEntries?: JournalEntryUncheckedCreateNestedManyWithoutValidatedElementsInput
  }

  export type ProgramElementCreateOrConnectWithoutProgramInput = {
    where: ProgramElementWhereUniqueInput
    create: XOR<ProgramElementCreateWithoutProgramInput, ProgramElementUncheckedCreateWithoutProgramInput>
  }

  export type ProgramElementCreateManyProgramInputEnvelope = {
    data: ProgramElementCreateManyProgramInput | ProgramElementCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type ChildCreateWithoutProgramInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    journalEntries?: JournalEntryCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateWithoutProgramInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    journalEntries?: JournalEntryUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildCreateOrConnectWithoutProgramInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutProgramInput, ChildUncheckedCreateWithoutProgramInput>
  }

  export type ChildCreateManyProgramInputEnvelope = {
    data: ChildCreateManyProgramInput | ChildCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type ProgramElementUpsertWithWhereUniqueWithoutProgramInput = {
    where: ProgramElementWhereUniqueInput
    update: XOR<ProgramElementUpdateWithoutProgramInput, ProgramElementUncheckedUpdateWithoutProgramInput>
    create: XOR<ProgramElementCreateWithoutProgramInput, ProgramElementUncheckedCreateWithoutProgramInput>
  }

  export type ProgramElementUpdateWithWhereUniqueWithoutProgramInput = {
    where: ProgramElementWhereUniqueInput
    data: XOR<ProgramElementUpdateWithoutProgramInput, ProgramElementUncheckedUpdateWithoutProgramInput>
  }

  export type ProgramElementUpdateManyWithWhereWithoutProgramInput = {
    where: ProgramElementScalarWhereInput
    data: XOR<ProgramElementUpdateManyMutationInput, ProgramElementUncheckedUpdateManyWithoutProgramInput>
  }

  export type ProgramElementScalarWhereInput = {
    AND?: ProgramElementScalarWhereInput | ProgramElementScalarWhereInput[]
    OR?: ProgramElementScalarWhereInput[]
    NOT?: ProgramElementScalarWhereInput | ProgramElementScalarWhereInput[]
    id?: StringFilter<"ProgramElement"> | string
    name?: StringFilter<"ProgramElement"> | string
    description?: StringFilter<"ProgramElement"> | string
    programId?: StringFilter<"ProgramElement"> | string
  }

  export type ChildUpsertWithWhereUniqueWithoutProgramInput = {
    where: ChildWhereUniqueInput
    update: XOR<ChildUpdateWithoutProgramInput, ChildUncheckedUpdateWithoutProgramInput>
    create: XOR<ChildCreateWithoutProgramInput, ChildUncheckedCreateWithoutProgramInput>
  }

  export type ChildUpdateWithWhereUniqueWithoutProgramInput = {
    where: ChildWhereUniqueInput
    data: XOR<ChildUpdateWithoutProgramInput, ChildUncheckedUpdateWithoutProgramInput>
  }

  export type ChildUpdateManyWithWhereWithoutProgramInput = {
    where: ChildScalarWhereInput
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyWithoutProgramInput>
  }

  export type ChildScalarWhereInput = {
    AND?: ChildScalarWhereInput | ChildScalarWhereInput[]
    OR?: ChildScalarWhereInput[]
    NOT?: ChildScalarWhereInput | ChildScalarWhereInput[]
    id?: StringFilter<"Child"> | string
    name?: StringFilter<"Child"> | string
    firstName?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    gender?: EnumGenderFilter<"Child"> | $Enums.Gender
    birthDate?: DateTimeFilter<"Child"> | Date | string
    programId?: StringFilter<"Child"> | string
  }

  export type ProgramCreateWithoutElementsInput = {
    id?: string
    name: string
    grade: $Enums.Grade
    children?: ChildCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutElementsInput = {
    id?: string
    name: string
    grade: $Enums.Grade
    children?: ChildUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutElementsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutElementsInput, ProgramUncheckedCreateWithoutElementsInput>
  }

  export type JournalEntryCreateWithoutValidatedElementsInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    child: ChildCreateNestedOneWithoutJournalEntriesInput
  }

  export type JournalEntryUncheckedCreateWithoutValidatedElementsInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    childId: string
  }

  export type JournalEntryCreateOrConnectWithoutValidatedElementsInput = {
    where: JournalEntryWhereUniqueInput
    create: XOR<JournalEntryCreateWithoutValidatedElementsInput, JournalEntryUncheckedCreateWithoutValidatedElementsInput>
  }

  export type ProgramUpsertWithoutElementsInput = {
    update: XOR<ProgramUpdateWithoutElementsInput, ProgramUncheckedUpdateWithoutElementsInput>
    create: XOR<ProgramCreateWithoutElementsInput, ProgramUncheckedCreateWithoutElementsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutElementsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutElementsInput, ProgramUncheckedUpdateWithoutElementsInput>
  }

  export type ProgramUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    children?: ChildUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    children?: ChildUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type JournalEntryUpsertWithWhereUniqueWithoutValidatedElementsInput = {
    where: JournalEntryWhereUniqueInput
    update: XOR<JournalEntryUpdateWithoutValidatedElementsInput, JournalEntryUncheckedUpdateWithoutValidatedElementsInput>
    create: XOR<JournalEntryCreateWithoutValidatedElementsInput, JournalEntryUncheckedCreateWithoutValidatedElementsInput>
  }

  export type JournalEntryUpdateWithWhereUniqueWithoutValidatedElementsInput = {
    where: JournalEntryWhereUniqueInput
    data: XOR<JournalEntryUpdateWithoutValidatedElementsInput, JournalEntryUncheckedUpdateWithoutValidatedElementsInput>
  }

  export type JournalEntryUpdateManyWithWhereWithoutValidatedElementsInput = {
    where: JournalEntryScalarWhereInput
    data: XOR<JournalEntryUpdateManyMutationInput, JournalEntryUncheckedUpdateManyWithoutValidatedElementsInput>
  }

  export type JournalEntryScalarWhereInput = {
    AND?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
    OR?: JournalEntryScalarWhereInput[]
    NOT?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
    id?: StringFilter<"JournalEntry"> | string
    date?: DateTimeFilter<"JournalEntry"> | Date | string
    comment?: StringFilter<"JournalEntry"> | string
    images?: StringNullableListFilter<"JournalEntry">
    childId?: StringFilter<"JournalEntry"> | string
  }

  export type ProgramCreateWithoutChildrenInput = {
    id?: string
    name: string
    grade: $Enums.Grade
    elements?: ProgramElementCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    grade: $Enums.Grade
    elements?: ProgramElementUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutChildrenInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutChildrenInput, ProgramUncheckedCreateWithoutChildrenInput>
  }

  export type JournalEntryCreateWithoutChildInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    validatedElements?: ProgramElementCreateNestedManyWithoutJournalEntriesInput
  }

  export type JournalEntryUncheckedCreateWithoutChildInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
    validatedElements?: ProgramElementUncheckedCreateNestedManyWithoutJournalEntriesInput
  }

  export type JournalEntryCreateOrConnectWithoutChildInput = {
    where: JournalEntryWhereUniqueInput
    create: XOR<JournalEntryCreateWithoutChildInput, JournalEntryUncheckedCreateWithoutChildInput>
  }

  export type JournalEntryCreateManyChildInputEnvelope = {
    data: JournalEntryCreateManyChildInput | JournalEntryCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ProgramUpsertWithoutChildrenInput = {
    update: XOR<ProgramUpdateWithoutChildrenInput, ProgramUncheckedUpdateWithoutChildrenInput>
    create: XOR<ProgramCreateWithoutChildrenInput, ProgramUncheckedCreateWithoutChildrenInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutChildrenInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutChildrenInput, ProgramUncheckedUpdateWithoutChildrenInput>
  }

  export type ProgramUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    elements?: ProgramElementUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade
    elements?: ProgramElementUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type JournalEntryUpsertWithWhereUniqueWithoutChildInput = {
    where: JournalEntryWhereUniqueInput
    update: XOR<JournalEntryUpdateWithoutChildInput, JournalEntryUncheckedUpdateWithoutChildInput>
    create: XOR<JournalEntryCreateWithoutChildInput, JournalEntryUncheckedCreateWithoutChildInput>
  }

  export type JournalEntryUpdateWithWhereUniqueWithoutChildInput = {
    where: JournalEntryWhereUniqueInput
    data: XOR<JournalEntryUpdateWithoutChildInput, JournalEntryUncheckedUpdateWithoutChildInput>
  }

  export type JournalEntryUpdateManyWithWhereWithoutChildInput = {
    where: JournalEntryScalarWhereInput
    data: XOR<JournalEntryUpdateManyMutationInput, JournalEntryUncheckedUpdateManyWithoutChildInput>
  }

  export type ProgramElementCreateWithoutJournalEntriesInput = {
    id?: string
    name: string
    description: string
    program: ProgramCreateNestedOneWithoutElementsInput
  }

  export type ProgramElementUncheckedCreateWithoutJournalEntriesInput = {
    id?: string
    name: string
    description: string
    programId: string
  }

  export type ProgramElementCreateOrConnectWithoutJournalEntriesInput = {
    where: ProgramElementWhereUniqueInput
    create: XOR<ProgramElementCreateWithoutJournalEntriesInput, ProgramElementUncheckedCreateWithoutJournalEntriesInput>
  }

  export type ChildCreateWithoutJournalEntriesInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    program: ProgramCreateNestedOneWithoutChildrenInput
  }

  export type ChildUncheckedCreateWithoutJournalEntriesInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
    programId: string
  }

  export type ChildCreateOrConnectWithoutJournalEntriesInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutJournalEntriesInput, ChildUncheckedCreateWithoutJournalEntriesInput>
  }

  export type ProgramElementUpsertWithWhereUniqueWithoutJournalEntriesInput = {
    where: ProgramElementWhereUniqueInput
    update: XOR<ProgramElementUpdateWithoutJournalEntriesInput, ProgramElementUncheckedUpdateWithoutJournalEntriesInput>
    create: XOR<ProgramElementCreateWithoutJournalEntriesInput, ProgramElementUncheckedCreateWithoutJournalEntriesInput>
  }

  export type ProgramElementUpdateWithWhereUniqueWithoutJournalEntriesInput = {
    where: ProgramElementWhereUniqueInput
    data: XOR<ProgramElementUpdateWithoutJournalEntriesInput, ProgramElementUncheckedUpdateWithoutJournalEntriesInput>
  }

  export type ProgramElementUpdateManyWithWhereWithoutJournalEntriesInput = {
    where: ProgramElementScalarWhereInput
    data: XOR<ProgramElementUpdateManyMutationInput, ProgramElementUncheckedUpdateManyWithoutJournalEntriesInput>
  }

  export type ChildUpsertWithoutJournalEntriesInput = {
    update: XOR<ChildUpdateWithoutJournalEntriesInput, ChildUncheckedUpdateWithoutJournalEntriesInput>
    create: XOR<ChildCreateWithoutJournalEntriesInput, ChildUncheckedCreateWithoutJournalEntriesInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutJournalEntriesInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutJournalEntriesInput, ChildUncheckedUpdateWithoutJournalEntriesInput>
  }

  export type ChildUpdateWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutChildrenNestedInput
  }

  export type ChildUncheckedUpdateWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    programId?: StringFieldUpdateOperationsInput | string
  }

  export type ProgramElementCreateManyProgramInput = {
    id?: string
    name: string
    description: string
  }

  export type ChildCreateManyProgramInput = {
    id?: string
    name: string
    firstName: string
    age: number
    gender: $Enums.Gender
    birthDate: Date | string
  }

  export type ProgramElementUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    journalEntries?: JournalEntryUpdateManyWithoutValidatedElementsNestedInput
  }

  export type ProgramElementUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    journalEntries?: JournalEntryUncheckedUpdateManyWithoutValidatedElementsNestedInput
  }

  export type ProgramElementUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type ChildUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntries?: JournalEntryUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntries?: JournalEntryUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalEntryUpdateWithoutValidatedElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    child?: ChildUpdateOneRequiredWithoutJournalEntriesNestedInput
  }

  export type JournalEntryUncheckedUpdateWithoutValidatedElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEntryUncheckedUpdateManyWithoutValidatedElementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEntryCreateManyChildInput = {
    id?: string
    date: Date | string
    comment: string
    images?: JournalEntryCreateimagesInput | string[]
  }

  export type JournalEntryUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    validatedElements?: ProgramElementUpdateManyWithoutJournalEntriesNestedInput
  }

  export type JournalEntryUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
    validatedElements?: ProgramElementUncheckedUpdateManyWithoutJournalEntriesNestedInput
  }

  export type JournalEntryUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: StringFieldUpdateOperationsInput | string
    images?: JournalEntryUpdateimagesInput | string[]
  }

  export type ProgramElementUpdateWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    program?: ProgramUpdateOneRequiredWithoutElementsNestedInput
  }

  export type ProgramElementUncheckedUpdateWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
  }

  export type ProgramElementUncheckedUpdateManyWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }
}