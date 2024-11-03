How to run 

1. Install python and pip 
2. Navigate to the project folder using CMD and enter: 
    Install Python dependencies for backend and Install React dependencies for frontend
```bash
pip install fastapi uvicorn sqlalchemy pandas scikit-learn
```

3. Navigate to the cos30049 folder using CMD and use this command:
    Install React dependencies for frontend, since we have all the packet we need in the packet.json file, we just need to re-install it
```bash
npm install 
```
4. Then go back to backend folder and enter: 

```bash
uvicorn main:app --reload
```

5. Now open another CMD window and enter the project folder then cos30049 folder, then enter

```bash
npm start
```

Then a web page would open up and you should see the page. 


Some common bug:
    When you start project by using the cos30049 directory and the command: npm start, the output sometime be likes: "react-script is not recognized"
    
keep the directory of front end you are on, use the script:
```bash
npm install
```
And then, waitt for the node_modules to be install. These node_modules cannot be uploaded to github so we have to fix it this way

This happend when we don's have the dependencies packets for the frontend to start


