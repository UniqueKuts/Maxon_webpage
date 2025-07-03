import base64
from flask import Flask, request, Response, jsonify, send_from_directory, send_file, redirect, url_for
from email.mime.text import MIMEText
import ssl
import smtplib
import boto3

from dotenv import load_dotenv
import os

load_dotenv()



app = Flask(__name__)

@app.route('/', methods = ['GET','POST', 'HEAD'])
def index_page():
    if request.method == 'HEAD':
        # Return an empty response with appropriate headers
        return Response(status=200)
    if request.method == 'GET':
        return send_from_directory('.','index.html')
    elif request.method == 'POST':
        return None
    return None

@app.route('/<path:file>', methods = ['GET','POST'])
def other_pages(file):
    if request.method == 'GET':
        if len(file) >= 2 and file[-1] == 'y' and file[-2] == 'p':
            return None
        return send_from_directory('.', file)
    elif request.method == 'POST':
        return None
    return None

contact_us_parameters = ['name', 'email', 'message']

@app.route('/contact_us', methods = ['GET', 'POST'])
def contact_us():
    if request.method == 'POST':
        post_json_data_dic = request.json
        for parameter in contact_us_parameters:
            if parameter not in post_json_data_dic or len(post_json_data_dic[parameter]) == 0:
                return jsonify({"status": "received", "message": "Data acknowledged"}), 400
        mail_subject = 'Message from ' + post_json_data_dic['name']
        message = 'Client Mail Id     : ' + post_json_data_dic['email'] + '\n'
        message += 'Client Message : ' + post_json_data_dic['message']
        send_the_mail(mail_subject, message)
        return jsonify({"status": "received", "message": "Data acknowledged"}), 200
    elif request.method == 'GET':
        return None
    return None

booking_parameters = ['customerType', 'services', 'timestamp', 'status']
individual_parameters = ['name' , 'phone', 'age']
organization_parameters = ['companyName', 'companySize', 'designation']

@app.route('/booking', methods = ['GET','POST'])
def booking():
    if request.method == 'POST':
        post_json_data_dic = request.json
        print(post_json_data_dic)
        mail_subject = 'Booking from the '
        message = ''
        for parameter in booking_parameters:
            if parameter not in post_json_data_dic or len(post_json_data_dic[parameter]) == 0:
                return jsonify({"status": "received", "message": "Data acknowledged"}), 400
        if post_json_data_dic['customerType'] == 'organization':
            for parameter in organization_parameters:
                if parameter not in post_json_data_dic or len(post_json_data_dic[parameter]) == 0:
                    return jsonify({"status": "received", "message": "Data acknowledged"}), 400
            mail_subject += 'organization ' + post_json_data_dic['companyName']
            message += 'Customer Type : organization' + '\n'
            message += 'Company Name  : ' + post_json_data_dic['companyName'] + '\n'
            message += 'Company Size  : ' + post_json_data_dic['companySize'] + '\n'
            message += 'Designation   : ' + post_json_data_dic['designation'] + '\n'
            message += 'Services Opted: '
            services = len(post_json_data_dic['services'])
            for i in range(services - 1):
                message += post_json_data_dic['services'][i] + ','
            message += post_json_data_dic['services'][services-1] + '\n'
            if 'queryMessage' in post_json_data_dic and len(post_json_data_dic['queryMessage']) > 0:
                message += 'Query Message : ' + post_json_data_dic['queryMessage']
        else:
            for parameter in individual_parameters:
                if parameter not in post_json_data_dic or len(post_json_data_dic[parameter]) == 0:
                    return jsonify({"status": "received", "message": "Data acknowledged"}), 400
            mail_subject += 'Individual ' + post_json_data_dic['name']
            message += 'Customer Type  : Individual' + '\n'
            message += 'Name                : ' + post_json_data_dic['name'] + '\n'
            message += 'Age                  : ' + post_json_data_dic['age'] + '\n'
            message += 'Services Opted : '
            services = len(post_json_data_dic['services'])
            for i in range(services - 1):
                message += post_json_data_dic['services'][i] + ','
            message += post_json_data_dic['services'][services-1] + '\n'
            message += 'Phone Number   : ' + post_json_data_dic['phone'] +'\n'
            if 'queryMessage' in post_json_data_dic and len(post_json_data_dic['queryMessage']) > 0:
                message += 'Query Message : ' + post_json_data_dic['queryMessage']
        return send_the_mail(mail_subject, message)
        #return jsonify({"status": "received", "message": "Data acknowledged"}), 200
    elif request.method == 'GET':
        return None
    return None

login_parameters = ['name','password']


@app.route('/login', methods = ['GET','POST'])
def login():
    if request.method == 'POST':
        post_json_data_dic = request.json
        print(post_json_data_dic)
        for parameter in login_parameters:
            if parameter not in post_json_data_dic or len(post_json_data_dic[parameter]) == 0:
                return jsonify({"status": "received", "message": "Data acknowledged"}), 400
        if post_json_data_dic[login_parameters[0]] == post_json_data_dic[login_parameters[1]]:
            #return send_file( app.root_path +  '/Profile_maxon.pdf', as_attachment=True, mimetype='/pdf')
            return jsonify({"status": "received", "message": "Data acknowledged"}), 200
        return 'password and id not matched'
    elif request.method == 'GET':
        return send_from_directory('.','login.html')
    return None





@app.route('/dashboard', methods = ['GET','POST'])
def dashboard():
    if request.method == 'POST':
        post_json_data_dic = request.json
        print(post_json_data_dic)
        for parameter in login_parameters:
            if parameter not in post_json_data_dic:
                return None
        if post_json_data_dic[login_parameters[0]] == post_json_data_dic[login_parameters[1]]:
            emp_id = post_json_data_dic['name']
            s3_object = s3_client.get_object(Bucket=BUCKET_NAME, Key=emp_id+'.pdf')
            pdf_content = s3_object['Body'].read()
            #with open(app.root_path + '/Profile_maxon.pdf', 'rb') as pdf_file:
            #    pdf_content = pdf_file.read()
            return jsonify({
                "status": "received",
                "message": "Data acknowledged",
                "emp_id": emp_id,
                "pdf": base64.b64encode(pdf_content).decode('utf-8'),
                "pdf_filename" : emp_id + '.pdf'
            }), 200
        return None
    elif request.method == 'GET':
        return send_from_directory('.','dashboard.html')
    return None


# Access environment variables
server_mail = os.getenv('SERVER_MAIL')
server_password = os.getenv('SERVER_MAIL_PASSWORD')
owner_mail = os.getenv('OWNER_MAIL')
smtp_server = os.getenv('SMTP_SERVER')
smtp_port = int(os.getenv('SMTP_PORT', 587))  # default 587 if not set


def send_the_mail(subject, message):
    print(message)
    msg = MIMEText(message, 'plain')
    msg['Subject'] = subject
    msg['From'] = server_mail
    msg['To'] = owner_mail
    context = ssl.create_default_context()
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls(context=context)
            server.login(server_mail, server_mail_PASSWORD)
            server.send_message(msg)
        print("mail sent")
    except Exception as e:
        print(e)
    return jsonify({"status": "received", "message": "Data acknowledged"}), 200


#def lambda_handler(event, context):
#    return awsgi.response(app, event, context, base64_content_types={"image/png"})

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0',port=8000)
