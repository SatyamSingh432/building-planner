# 🏗️ Building Planner Web App

A lightweight web application to draw, annotate, and manage simple building plans in-browser. Built with React and Konva.

---

## 🚀 Features

### ✏️ Drawing Tools

- Draw shapes: Rectangle, Circle, Line and Arrow
- Real-time shape preview during drawing

### 🧲 Shape Selection

- Select any shape to move or resize
- Transformer box for selected shape

### 📐 Annotations

- Auto-dimensions for each shape:

  - Rect: Width x Height
  - Circle: Radius
  - Line: Length
  - Arrow: Length

- Toggle annotation visibility

### 🛠️ Editing

- Resize using transformer handles (rectangles, circles)
- Drag to reposition any shape
- Press **Delete** or **Backspace** to remove selected shape

### 💾 Architecture

- **React** for component-driven UI
- **Tailwind CSS** for clean design
- **Konva / react-konva** for canvas rendering
- **Context API** for shared state
- **MongoDB + Mongoose** planned for persistence

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js >= 16

### Clone the repository

```bash
git clone https://github.com/SatyamSingh432/building-planner.git
cd building-planner
```

### Install Frontend Dependency

```bash
cd frontend
npm install
```

### Run the App

```bash
npm run dev
```

### Install Backend Dependency

```bash
cd backend
npm install
```

### Run the App

```bash
npm run dev
```

---

## 📸 Screenshots

1. **Drawing a shape**
---first, select any of the given shapes, then click on the canvas and start moving the cursor
 <img width="1413" alt="Screenshot 2025-06-21 at 12 18 22 PM" src="https://github.com/user-attachments/assets/02894fc0-ff41-4ab9-ad0a-0c6493a4d192" />

2. **Selected shape with resize handles*
---first, select the select button, then double click on the shape, then u can drag and change its size
 <img width="1415" alt="Screenshot 2025-06-21 at 12 19 08 PM" src="https://github.com/user-attachments/assets/fbfd990b-a06a-43bf-8112-3804da0ae78a" />

4. **Shapes with visible annotations**
--- To see annotations, click on the show annotation button in the toolbar.
 <img width="1437" alt="Screenshot 2025-06-21 at 12 30 16 PM" src="https://github.com/user-attachments/assets/ab045082-0fef-43f4-a663-f55a69086e8e" />

5. **Deleting a shape**
 ---first, select the select button, then double click on the shape, then by backspace and by delete button u can delete the shape, and for deleting all shapes, click on the clear button in the toolbar
<img width="1434" alt="Screenshot 2025-06-21 at 12 30 43 PM" src="https://github.com/user-attachments/assets/74cc0f7b-d1e7-4ca3-9943-91a614802fe4" />

---

## 📂 Project Structure

```
src/
├── components/
│   └── Canvas.jsx     # Main drawing canvas logic
|   |__ ToolBar.jsx
├── context/
│   └── DrawingContext.jsx    # React context for global state
|-- utils/
|   |__Apis.js
├── App.jsx
├── main.jsx
```

---

## 👨‍🔧 Author

Made with ❤️ by Satyam Singh

Feel free to contribute or suggest improvements!
