# Module 18 Challenge Project - NoSQL Challenge: Social Networkl API
This program is an NoSQL database, using MongoDB to internally manage the data. The server runs on a localhost:3001 and allows you to run a PUT, GET, DELETE, POST via insomnia. Please take time to listen to the walkthrough video that shows how to add, remove and update data to this social network. 


## Running the Social Network API
* From the Terminal prompt, in this projects main folder, type "node ./server.js". This starts the application that will be running on localhost:30001 while the user can minipulate data using insomnia. I've created the following, for a lack of terms, tables that manage and cross reference into one another:

    - Users

        * DEL  - You can remove an user by id.
        * PUT  - Update user(s) 
        * GET  - Display all users in the table.
        * GET  - You can also get a user by the Id.
        * POST - Create a new user or users by JSON format.

        * Field Layout for Users:
            - username      : Format - string, unique, required entry, and trimmed
            - email         : Format - string, unique, required entry, and must match a valid email address.
            - thoughts      : Format - array of Id's referencing the Thought model.
            - friends       : Format - array of Id's referencing the User model.
            - friendCount   : Format - virtual that shows the number of friends for a user.


    - Reactions

        * DEL  - You can remove an reaction by id.
        * POST - Create a new reaction or reactions by JSON format.

        * Field Layout for Reactions:
            - reactionId    : Format - objectId, default - new ObjectId.
            - reactionBody  : Format - string, required entry, and has a maximum number of 28 characters.
            - username      : Format - string, required entry.
            - createdAt     : Format - date, default = now, getter method for formatting the timestamp.


    - Thoughts

        * POST - Create a new thought or thouhgts by JSON format.
        * PUT  - Update thoughts(s) 
        * GET  - Display all thoughts in the table.
        * GET  - You can also get a thought by the Id.

        * Field Layout for Reactions:
            - thoughtText   : Format - string, required entry, and must be between 1 and 280 characters.
            - createdAt     : Format - date, default = now, getter method for formatting the timestamp.
            - username      : Format - string, required entry
            - reactions     : Format - array of nested documents.
            - reactionCount : Format - virtual that shows the number of reactions for a thought.



### Special Notes:
* The server.js file is the main driver for starting the application server. Then I've created a structured layout for the javascript project itself. You will see the following folders: 
    - config : Contains the configuration settings for the mongoDB.
    - models : Houses your three different tables for Getting, Putting, Posting, and Deleting detail.
    - routes : Controllers for routing the API data accordingly.

* Packages installed for this application were:
    - MongoDB : JSON data that controls how the information is stored.
    - Mongoose : Used to work and minipulate some of the JSON/DB data. 
    - Express : Express is used to assist in running the server on localhost:3001.

* Link to walkthrough video.

### Screen Shots.
![image](https://user-images.githubusercontent.com/108200823/197836379-50b307bc-c7b4-4344-95ab-01515f00b898.png)
![image](https://user-images.githubusercontent.com/108200823/197836432-031e0c44-b30b-4990-871c-5bd084918d05.png)
![image](https://user-images.githubusercontent.com/108200823/197836473-3284a468-d284-47f7-89c0-341505e9c090.png)
![image](https://user-images.githubusercontent.com/108200823/197836602-67c934bb-e484-4e20-b224-40a8a71e04a4.png)
![image](https://user-images.githubusercontent.com/108200823/197836641-54b41bd1-8145-4650-847f-ccd7614408dc.png)
![image](https://user-images.githubusercontent.com/108200823/197836690-d992d479-a5d1-42ce-a9e5-a4be659f9b18.png)
![image](https://user-images.githubusercontent.com/108200823/197836730-97e01726-3694-4727-9061-f94a6b054b1a.png)
![image](https://user-images.githubusercontent.com/108200823/197836755-0b345af9-c9a6-40f5-bcc4-6c56dc4632e8.png)
![image](https://user-images.githubusercontent.com/108200823/197836783-4323b69c-8f39-420e-bccb-375edf26963e.png)
![image](https://user-images.githubusercontent.com/108200823/197836829-395da9ea-827d-4c33-81b3-4d685c16796d.png)
![image](https://user-images.githubusercontent.com/108200823/197836862-f43e4a1f-2942-4e8f-8c20-f0527b8ec9ee.png)
![image](https://user-images.githubusercontent.com/108200823/197836902-7e70d61b-7b13-4664-9676-37647bd4db2c.png)
![image](https://user-images.githubusercontent.com/108200823/197836951-6ba993c0-7c16-4b79-8870-bf69ed9669a8.png)
![image](https://user-images.githubusercontent.com/108200823/197836976-ffdd2282-89f3-4719-8a5c-738858725a6c.png)
![image](https://user-images.githubusercontent.com/108200823/197837000-abfd7c11-ed48-41bd-9501-94edf6d6d968.png)

