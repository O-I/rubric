# Rubric

## D3 visualizations of Ruby

This is a personal exploration of D3, JavaScript, and data visualization.

### Data Set

The data set is a hodgepodge of YAML, JSON, and CSV files that represent relationships between Ruby classes in the core library.

### Visualizations

Currently, there are four:

#### 1. Chord Layout

Illustrates the class-superclass relationship of Ruby core classes.

Each class is connected to its superclass by a tapering chord. For example, `Class < Module` is represented by a bisque colored chord that narrows as it travels from the `Class` arc to the `Module` arc.

Hovering over a particular class arc reveals the relationships for the that particular class. For example, hovering over `Object` reveals its connections to its 40 direct children and its parent class `BasicObject`.

Hovering over a chord reveals a tooltip containing the class inheritance it represents, e.g., hovering over the Paolo Veronese green chord shows `Integer < Numeric`.

#### 2. Sunburst

Illustrates Ruby core class hierarchy as a zoomable radial layout.

The root node `BasicObject` is at the center with leaves at the circumference. Click on any arc to zoom in. Click on the center to zoom out.

Size of an arc is determined by the number of direct descendants plus one of the class it represents. Currently arcs are unlabeled.

#### 3. Treemap

Illustrates which classes have the most children.

Area of each rectangle is proportional to the number of direct descendants plus one of the class it represents. Tensioned lines connect each class to its ancestors.

(This diagram is likely not a good candidate for visualizing the data set it was given. That might be true of every visualization here. But that's a key point of the exercise — figuring out which diagrams are good fits for telling compelling stories of which data sets.)

#### 4. Edge Bundling

Illustrates Ruby core class hierarchy as a radial edge bundling.

Hovering on a class reveals all descendants in green and all ancestors in red.