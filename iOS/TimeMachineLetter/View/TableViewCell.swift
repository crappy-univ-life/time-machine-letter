//
//  TableViewCell.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/05/23.
//

import UIKit

class TableViewCell: UITableViewCell {
    
    var title = UILabel()
    var time = UILabel()
    var badge = UILabel()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        title.translatesAutoresizingMaskIntoConstraints = false
        title.font = UIFont.systemFont(ofSize: 20)
        
        time.translatesAutoresizingMaskIntoConstraints = false
        time.font = UIFont.systemFont(ofSize: 18)
        time.textColor = .darkGray
        
        badge.translatesAutoresizingMaskIntoConstraints = false
        badge.backgroundColor = .systemYellow
        badge.layer.cornerRadius = 5
        badge.clipsToBounds = true
        
        contentView.addSubview(title)
        contentView.addSubview(time)
        contentView.addSubview(badge)
        
        
        NSLayoutConstraint.activate([
            
            badge.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 10),
            badge.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 20),
            badge.heightAnchor.constraint(equalToConstant: 10),
            badge.widthAnchor.constraint(equalToConstant: 10),
            
            title.leadingAnchor.constraint(equalTo: badge.trailingAnchor, constant: 10),
            title.centerYAnchor.constraint(equalTo: badge.centerYAnchor),
            
            time.topAnchor.constraint(equalTo: title.bottomAnchor, constant: 10),
            time.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -10),
            time.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -10),
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
