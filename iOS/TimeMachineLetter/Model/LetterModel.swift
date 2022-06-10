//
//  LetterModel.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/06/08.
//

import Foundation

struct LetterModel: Codable {
    let openAt: String
    let title: String
    let content: String
    let letterTo: String
    let letterFrom: String
    let password: String
}
