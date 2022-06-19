import { app } from './app'
import request from 'supertest'

describe("1 scenario", () => {
  it("Get all records with a GET api/users request", async () => {
    const res = await request(app)
      .get("/api/users")
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      success: true,
      data: [],
      errMsg: null
    })
  })

  const user = {
    username: "Artiom",
    age: 26,
    hobbies: ['guitar', 'coding', 'reading']
  }

  let id = ''

  it("A new object is created by a POST api/users request", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(user)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("success", true)
    expect(res.body).toHaveProperty("errMsg", null)
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toBeInstanceOf(Object)
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data).toHaveProperty("username", user.username)
    expect(res.body.data).toHaveProperty("age", user.age)
    expect(res.body.data).toHaveProperty("hobbies", user.hobbies)
    expect(res.body.data.hobbies).toBeInstanceOf(Array)

    id = res.body.data.id
  })

  it("With a GET api/user/{userId} request, we try to get the created record by its id", async () => {
    const res = await request(app)
      .get(`/api/users/${id}`)
      .send()

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        success: true,
        data: {
          id,
          ...user
        },
        errMsg: null
      })
  })

  const newProps = {
    username: "Filkevich",
    hobbies: ['guitar', 'coding', 'reading']
  }

  it("We try to update the created record with a PUT api/users/{userId}request", async () => {
    const res = await request(app)
      .put(`/api/users/${id}`)
      .send(newProps)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        success: true,
        data: {
          id,
          ...user,
          ...newProps
        },
        errMsg: null
      })
  })

  it("With a DELETE api/users/{userId} request, we delete the created object by id", async () => {
    const res = await request(app)
      .delete(`/api/users/${id}`)
      .send()

      expect(res.statusCode).toEqual(204)
  })

  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id", async () => {
    const res = await request(app)
      .get(`/api/users/${id}`)
      .send()

      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        success: false,
        data: null,
        errMsg: 'There is no user with such ID.'
      })
  })

})


describe("2 scenario", () => {
  it("Try to get the wrong route", async () => {
    const res = await request(app)
      .get("/api/userssss")
      .send()

    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({
      success: false,
      data: null,
      errMsg: 'There is no such endpoint'
    })
  })

  const wrongType = {
    "username": 11,
    "age": 11,
    "hobbies": []
  }

  it("Try to get the post wrong type", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(wrongType)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      "success": false,
      "data": null,
      "validateErrMsg": "The property 'username' has wrong type. Expected string instead of number."
    })
  })

  const noNeededProp = {
    "username": "Artiom",
    "age": 26,
    "hobbies": ["music"],
    "profession": "Frontend developer"
}

  it("Try to get the post wrong type", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(noNeededProp)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      "success": false,
      "data": null,
      "validateErrMsg": "The property 'profession' is not needed."
    })
  })
})

describe("3 scenario", () => {
  const user1 = {
    username: "Artiom",
    age: 26,
    hobbies: ['music']
  }

  const user2 = {
    username: "Igor",
    age: 74,
    hobbies: []
  }

  const user3 = {
    username: "Max",
    age: 11,
    hobbies: ['Dota2']
  }

  let
    userId1 = '',
    userId2 = '',
    userId3 = ''

  it("Creation of the user1", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(user1)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("success", true)
    expect(res.body).toHaveProperty("errMsg", null)
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toBeInstanceOf(Object)
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data).toHaveProperty("username", user1.username)
    expect(res.body.data).toHaveProperty("age", user1.age)
    expect(res.body.data).toHaveProperty("hobbies", user1.hobbies)
    expect(res.body.data.hobbies).toBeInstanceOf(Array)

    userId1 = res.body.data.id
  })

  it("Creation of the user2", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(user2)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("success", true)
    expect(res.body).toHaveProperty("errMsg", null)
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toBeInstanceOf(Object)
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data).toHaveProperty("username", user2.username)
    expect(res.body.data).toHaveProperty("age", user2.age)
    expect(res.body.data).toHaveProperty("hobbies", user2.hobbies)
    expect(res.body.data.hobbies).toBeInstanceOf(Array)

    userId2 = res.body.data.id
  })

  it("Creation of the user3", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(user3)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("success", true)
    expect(res.body).toHaveProperty("errMsg", null)
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toBeInstanceOf(Object)
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data).toHaveProperty("username", user3.username)
    expect(res.body.data).toHaveProperty("age", user3.age)
    expect(res.body.data).toHaveProperty("hobbies", user3.hobbies)
    expect(res.body.data.hobbies).toBeInstanceOf(Array)

    userId3 = res.body.data.id
  })

  it("Get all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      success: true,
      data: [
        {
          id: userId1,
          ...user1
        },
        {
          id: userId2,
          ...user2
        },
        {
          id: userId3,
          ...user3
        },
      ],
      errMsg: null
    })

    userId3 = res.body.data.id
  })
})