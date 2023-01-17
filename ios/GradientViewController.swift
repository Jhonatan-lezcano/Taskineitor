//
//  GradientViewController.swift
//  Taskineitor
//
//  Created by Jhonatan Lezcano on 16/01/23.
//

import Foundation

import UIKit

class GradientViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()
  }
  
  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
    
    let gradient = CAGradientLayer()
    gradient.colors = ["#6A3DE8", "#536DFE"]
    gradient.locations = [0.1, 1.0]
    gradient.startPoint = CGPoint(x: 0.0, y: 0.0)
    gradient.endPoint = CGPoint(x: 0.0, y:  1.0)
    gradient.frame = CGRect(x: 0.0, y: 0.0, width: self.view.frame.width, height: self.view.frame.height)
    
    self.view.layer.insertSublayer(gradient, at: 0)
  }
}
