//
//  AgoraRendererViewManager.m
//  AgoraReact
//
//  Created by GongYuhua on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AgoraRendererViewManager.h"

@implementation AgoraRendererViewManager
RCT_EXPORT_MODULE();

static AgoraRendererViewManager *manager;

+ (AgoraRendererViewManager *)currentManager {
  return manager;
}

- (UIView *)view {
  manager = self;
  return [[UIView alloc] init];
}

@end
