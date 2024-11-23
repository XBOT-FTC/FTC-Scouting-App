import requests
from flask import Flask, jsonify, request

from pymongo import MongoClient

token = "xoxe.xoxp-1-Mi0yLTc5MzYwMjA4ODQyOTMtNzkzODg3OTA1NTQ5MC04MDU0OTE2Mzc4ODU0LTgwNzQyMTc2OTQwNDktNjZlNTM1MjExODJmOTZjYjEzYWJlZTM5MWFjMzAwZWQwN2FhZWU0ZTQyYzRiMWQwMmU1NWZmZTNmMDdkYmQxZA"

app = Flask(__name__)

@app.route('/backend/api', methods=['POST'])
def receive_data():
    token = request.get_json()

    # Retrieve the user_info:
    user_info = get_user_info(token)
    if user_info:
        # for key in user_info.keys():
            # print(key, user_info[key])
        # print(user_info["sub"])
        print(user_info["name"])
    else:
        print("Failed to retrieve user information.")    
    
    
    # check database if user_name exists.
    # if it does not exist, update the database w/ a new entry

    response = {'message': 'Data received successfully', 'data': token}
    return jsonify(response), 200

# Helper method to retrieve the username from Slack.
def get_user_info(token):
    url = 'https://slack.com/api/openid.connect.userInfo'
    headers = {
        'Authorization': f'Bearer {token}'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        user_info = response.json()
        return user_info
    else:
        print(f"Error {response.status_code}: {response.text}")
        return None

def check_db_user(username, client):
    try:
        client.admin.command("ping")
        print("Connected successfully")

        # add pydotenv to check for mongodb

        client.close()

    except Exception as e:
        raise Exception(
        "The following error occurred: ", e)




if __name__ == "__main__":
    app.run(debug=True)
    

# TODO: 
"""
1. Retrieve a request and check if it's a 1st time authentication
2. Update MongoDB Query w/ User-Info if it's 1st time
    - if it's an old login, update timestamp?

"""
