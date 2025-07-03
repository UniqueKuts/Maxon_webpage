from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import requests

app = Flask(__name__)
CORS(app)

# The IP address of the server where data should be forwarded
FORWARD_URL_BASE = 'http://192.168.1.69:8000'

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

# Booking form endpoints
@app.route('/api/bookings', methods=['POST'])
def create_booking():
    try:
        data = request.get_json()
        
        # Forward the data to the target server
        try:
            forward_url = f"{FORWARD_URL_BASE}"
            headers = {'Content-Type': 'application/json'}
            
            print(f"Forwarding booking data to: {forward_url}")
            print(json.dumps(data, indent=4))
            
            response = requests.post(forward_url, json=data, headers=headers, timeout=5) # 5-second timeout
            response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
            
            return jsonify({
                'message': 'Booking data forwarded successfully',
                'forward_response': response.json()
            }), 201
        
        except requests.exceptions.RequestException as e:
            print(f"Error forwarding booking data: {e}")
            return jsonify({'error': 'Failed to forward booking data to the destination server.'}), 502 # 502 Bad Gateway
        
    except Exception as e:
        print(f"An error occurred while processing the booking: {e}")
        return jsonify({'error': 'An internal error occurred.'}), 500

# Contact form endpoints
@app.route('/api/contact', methods=['POST'])
def create_contact_inquiry():
    try:
        data = request.get_json()
        
        # Forward the data to the target server
        try:
            forward_url = f"{FORWARD_URL_BASE}"
            headers = {'Content-Type': 'application/json'}
            
            print(f"Forwarding contact inquiry to: {forward_url}")
            print(json.dumps(data, indent=4))

            response = requests.post(forward_url, json=data, headers=headers, timeout=5)
            response.raise_for_status()
            
            return jsonify({
                'message': 'Contact inquiry forwarded successfully',
                'forward_response': response.json()
            }), 201
        
        except requests.exceptions.RequestException as e:
            print(f"Error forwarding contact data: {e}")
            return jsonify({'error': 'Failed to forward contact data to the destination server.'}), 502
        
    except Exception as e:
        print(f"An error occurred while processing the contact inquiry: {e}")
        return jsonify({'error': 'An internal error occurred.'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 