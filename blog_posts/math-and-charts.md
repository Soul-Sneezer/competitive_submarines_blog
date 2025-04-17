---
title: "Mathematical Notation and Charts in Blog Posts"
date: 2024-04-17
---

# Mathematical Notation and Charts in Blog Posts

This post demonstrates how to use mathematical notation and charts in our blog posts.

## Mathematical Notation

### Block Math

Here's Einstein's famous equation:

```math
E = mc^2
```

And here's the quadratic formula:

```math
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
```

### Inline Math

You can also include math inline with text, like this: `math-inline:E = mc^2` is one of the most famous equations in physics.

## Charts and Graphs

### Line Chart

Here's a simple line chart showing submarine speed over time:

```chart
{
  "height": "400px",
  "width": "100%",
  "config": {
    "type": "line",
    "data": {
      "labels": ["January", "February", "March", "April", "May", "June"],
      "datasets": [{
        "label": "Submarine Speed (knots)",
        "data": [65, 59, 80, 81, 56, 55],
        "borderColor": "rgb(75, 192, 192)",
        "tension": 0.1
      }]
    },
    "options": {
      "responsive": true,
      "plugins": {
        "legend": {
          "position": "top"
        }
      }
    }
  }
}
```

### Bar Chart

Here's a bar chart showing submarine performance metrics:

```chart
{
  "height": "400px",
  "width": "100%",
  "config": {
    "type": "bar",
    "data": {
      "labels": ["Speed", "Maneuverability", "Stealth", "Weapon Systems", "Sensors"],
      "datasets": [{
        "label": "Performance Metrics",
        "data": [85, 70, 90, 75, 80],
        "backgroundColor": "rgba(75, 192, 192, 0.5)",
        "borderColor": "rgb(75, 192, 192)",
        "borderWidth": 1
      }]
    },
    "options": {
      "responsive": true,
      "plugins": {
        "legend": {
          "position": "top"
        }
      },
      "scales": {
        "y": {
          "beginAtZero": true,
          "max": 100
        }
      }
    }
  }
}
```

## Combining Math and Charts

Here's a mathematical function visualized as a chart:

```math
f(x) = x^2 + 2x + 1
```

```chart
{
  "height": "400px",
  "width": "100%",
  "config": {
    "type": "scatter",
    "data": {
      "datasets": [{
        "label": "f(x) = x² + 2x + 1",
        "data": [
          {"x": -5, "y": 16},
          {"x": -4, "y": 9},
          {"x": -3, "y": 4},
          {"x": -2, "y": 1},
          {"x": -1, "y": 0},
          {"x": 0, "y": 1},
          {"x": 1, "y": 4},
          {"x": 2, "y": 9},
          {"x": 3, "y": 16},
          {"x": 4, "y": 25},
          {"x": 5, "y": 36}
        ],
        "showLine": true,
        "borderColor": "rgb(75, 192, 192)",
        "backgroundColor": "rgba(75, 192, 192, 0.5)"
      }]
    },
    "options": {
      "responsive": true,
      "plugins": {
        "legend": {
          "position": "top"
        }
      },
      "scales": {
        "x": {
          "type": "linear",
          "position": "bottom"
        }
      }
    }
  }
}
``` 