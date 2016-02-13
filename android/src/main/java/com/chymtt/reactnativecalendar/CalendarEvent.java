package com.chymtt.reactnativecalendar;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.prolificinteractive.materialcalendarview.CalendarDay;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * Created by Chym on 29/11/15.
 */
public class CalendarEvent extends Event<CalendarEvent>{
    public static final String EVENT_NAME = "topDateChange";

    private static final String DATE_FORMAT = "yyyy/MM/dd";
    private static final DateFormat dateFormat;
    static {
        dateFormat = new SimpleDateFormat(DATE_FORMAT);
    }

    private final CalendarDay date;
    private final boolean selected;

    public CalendarEvent(int viewId, long timestampMs, CalendarDay date, boolean selected) {
        super(viewId, timestampMs);
        this.date = date;
        this.selected = selected;
    }

    public String getDate() {
        return dateFormat.format(date.getDate());
    }

    public boolean isSelected() {
        return selected;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public short getCoalescingKey() {
        return 0;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putString("date", getDate());
        eventData.putBoolean("selected", isSelected());
        return eventData;
    }
}
