# Fitness App API - Documentation

## Resources

- App Base Url
    - https://fitnessapp-api-ln8u.onrender.com

- Admin User
    - No Admin

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```
#### [GET] - "/users/details"

- Requires token
- No Request Body

      
### Workouts

#### [POST] - "/workouts/addWorkout"

- Sample Request Body

    ```json

    {
        "name": "Sample Workout",
        "duration": "30 mins",
    }

    ```

#### [GET] - "/workouts/getMyWorkouts"
- Requires Token
- No Request Body


#### [PATCH] - "/workouts/updateWorkout/:id"
- Requires Token
- Sample Request Body

    ```json

    {
        "name": "Sample Workout",
        "duration": "30 mins",
    }

    ```

#### [DELETE] - "/workouts/deleteMovie/:id"
- Requires Token
- No Request Body

#### [POST] - "/workouts/completeWorkoutStatus/:id"
- Requires Token
- No Request Body
