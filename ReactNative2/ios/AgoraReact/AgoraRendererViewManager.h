//
//  AgoraRendererViewManager.h
//  AgoraReact
//
//  Created by GongYuhua on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTUIManager.h>

@interface AgoraRendererViewManager : RCTViewManager
+ (AgoraRendererViewManager *)currentManager;
@end
