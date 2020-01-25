/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Rss2jsonService } from './rss2json.service';

describe('Service: Rss2json', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Rss2jsonService]
    });
  });

  it('should ...', inject([Rss2jsonService], (service: Rss2jsonService) => {
    expect(service).toBeTruthy();
  }));
});
