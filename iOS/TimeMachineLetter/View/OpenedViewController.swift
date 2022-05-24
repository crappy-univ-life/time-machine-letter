//
//  OpenedViewController.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/05/24.
//

import UIKit


class OpenedViewController: UIViewController {
    
    var myTableView: UITableView = UITableView()
    let items: [String] = ["열람가능", "열람가능", "열람가능"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        view.backgroundColor = .blue
        
        myTableView.dataSource = self

        myTableView.register(TableViewCell.self, forCellReuseIdentifier: "TableViewCell")
        myTableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(myTableView)
        
        let navBar = UIView()
        navBar.backgroundColor = .systemYellow
        navBar.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(navBar)
        
        let navBarTitle = UILabel()
        navBarTitle.translatesAutoresizingMaskIntoConstraints = false
        navBarTitle.text = "열람 가능 편지"
        navBarTitle.font = .systemFont(ofSize: 20)
        navBar.addSubview(navBarTitle)
        
        let navBarButton = UIButton()
        navBarButton.translatesAutoresizingMaskIntoConstraints = false
        navBarButton.setImage(UIImage(named: "write"), for: .normal)
        navBar.addSubview(navBarButton)
        
        NSLayoutConstraint.activate([
            
            myTableView.topAnchor.constraint(equalTo: navBar.bottomAnchor),
            myTableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            myTableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            myTableView.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor),
            
            navBar.widthAnchor.constraint(equalTo: view.widthAnchor),
            navBar.heightAnchor.constraint(equalToConstant: 80),
            navBar.topAnchor.constraint(equalTo: view.topAnchor),
            
            navBarTitle.centerXAnchor.constraint(equalTo: navBar.centerXAnchor),
            navBarTitle.bottomAnchor.constraint(equalTo: navBar.bottomAnchor, constant: -10),
            
            navBarButton.centerYAnchor.constraint(equalTo: navBarTitle.centerYAnchor),
            navBarButton.widthAnchor.constraint(equalToConstant: 30),
            navBarButton.heightAnchor.constraint(equalToConstant: 30),
            navBarButton.trailingAnchor.constraint(equalTo: navBar.trailingAnchor, constant: -20)
        ])
    }
}

extension OpenedViewController: UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.items.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TableViewCell", for: indexPath)
        if let customCell = cell as? TableViewCell {
            customCell.title.text = items[indexPath.row]
            customCell.time.text = "2000.00.00"
            
            return customCell
        }
        return cell
    }
}
