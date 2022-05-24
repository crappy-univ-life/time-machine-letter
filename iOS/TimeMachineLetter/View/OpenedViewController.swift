//
//  OpenedViewController.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/05/24.
//

import UIKit


class OpenedViewController: UIViewController {
    
    let myTableView: UITableView = UITableView()
    let items: [String] = ["hello", "swift", "ios"]
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        view.backgroundColor = .blue
        
        myTableView.dataSource = self

        myTableView.register(UITableViewCell.self, forCellReuseIdentifier: "TableViewCell")
        myTableView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(myTableView)

        NSLayoutConstraint.activate([
            myTableView.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor),
            myTableView.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor),
            myTableView.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
            myTableView.trailingAnchor.constraint(equalTo: view.layoutMarginsGuide.trailingAnchor),
            view.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
}

extension OpenedViewController: UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.items.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TableViewCell", for: indexPath)
        cell.textLabel?.text = items[indexPath.row]

        return cell
    }
}
