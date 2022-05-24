//
//  MainViewController.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/05/23.
//

import UIKit

class MainViewController: UITabBarController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let openedVC = OpenedViewController()
        let closedVC = ClosedViewController()
        
        self.setViewControllers([openedVC, closedVC], animated: true)
        
        tabBar.backgroundColor = .white
        tabBar.items?[0].image = UIImage(named: "opened")
        tabBar.items?[0].title = "Opened"
        tabBar.items?[1].image = UIImage(named: "closed")
        tabBar.items?[1].title = "Closed"
        tabBar.tintColor = .systemYellow
        
        NSLayoutConstraint.activate([
            
        ])
    }
}





