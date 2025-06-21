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
2. **Selected shape with resize handles**
3. **Shapes with visible annotations**
4. **Deleting a shape**

---

## 📂 Project Structure

```
src/
├── components/
│   └── Canvas.jsx      # Main drawing canvas logic
├── context/
│   └── DrawingContext.jsx    # React context for global state
├── App.jsx
├── main.jsx
```

---

## 👨‍🔧 Author

Made with ❤️ by Satyam Singh

Feel free to contribute or suggest improvements!
