# Improving Checkout: Pickup Experience

Category: Mobile Design, Responsive Design, Web Design
My Role: Product Design, Research, UI Design, UX Design, UX Writing

## TL;DR

> Goal: Reduce cart abandonment by presenting the cheapest delivery option as the default in checkout.
> 
> 
> **Hypothesis**: Aligning the default with user preference will shorten decision time and lift conversion.
> 

## Why change the default?

- Users reach payment faster when the preferred choice is pre selected.
- According to [Baymard research](https://baymard.com/lists/cart-abandonment-rate), the average cart abandonment rate is 70%, with 39% of shoppers citing extra costs like shipping as the main reason.
- Surfacing the cheapest option first sets accurate cost expectations.

## Expected Business Impact

| Metric | Target |
| --- | --- |
| Cart abandonment rate | ↓ |
| Checkout conversion | ↑ |

## Process

### 1. Research

- Reviewed Baymard guidelines on Shipping & Store Pickup.
- Audited checkout flows of Vila, Adidas, H&M, Mango, Nike (desktop & mobile).

### 2. Quantitative data

| Data source | Most selected option |
| --- | --- |
| Power BI (weekly view) | **Standard Home Delivery** |
| Google Analytics (12 month avg.) | **Standard Pick Up** |

### 3. Competitor analysis

![image.png](Improving%20Checkout%20Pickup%20Experience/image.png)

## Insights

1. Set the default to what most customers pick.
2. If shipping isn’t free, show the cheapest shipping choice first to build trust.
3. Using a map overlay makes it easier for customers to choose a pickup point by lowering mental effort.

## Current vs. Proposed Flow

![image.png](Improving%20Checkout%20Pickup%20Experience/image%201.png)

## Solution Exploration

### Concept A - Tab switcher

This solution splits delivery into Delivery and Pickup tabs, with minimal UI adjustments to the overlay and selected screen.

![image.png](Improving%20Checkout%20Pickup%20Experience/image%202.png)

### Concept B - Map add on

This solution keeps the three-part structure but sets standard home delivery as default and adds map view.

![image.png](Improving%20Checkout%20Pickup%20Experience/image%203.png)

### Concept C - Tabs + Map

This solution divides the delivery into 2 parts of Delivery and Pick Up and has the map view overlay.

![image.png](Improving%20Checkout%20Pickup%20Experience/image%204.png)

## Implementation & Iteration

### v1 – initial rollout

- Default = cheapest option.
- Tabbed selector introduced.

![image.png](Improving%20Checkout%20Pickup%20Experience/image%205.png)

### v2 – current live

- Address validation enhancements.
- UI adjustments in Delivery and Overlay screens.

![image.png](Improving%20Checkout%20Pickup%20Experience/image%206.png)

## Results

Shows positive improvements with

- ↓ cart abandonment
- ↑ overall conversion