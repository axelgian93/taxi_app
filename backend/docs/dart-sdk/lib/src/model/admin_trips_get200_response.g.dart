// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_trips_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTripsGet200Response extends AdminTripsGet200Response {
  @override
  final BuiltList<AdminTripsGet200ResponseItemsInner>? items;
  @override
  final String? nextCursor;

  factory _$AdminTripsGet200Response(
          [void Function(AdminTripsGet200ResponseBuilder)? updates]) =>
      (AdminTripsGet200ResponseBuilder()..update(updates))._build();

  _$AdminTripsGet200Response._({this.items, this.nextCursor}) : super._();
  @override
  AdminTripsGet200Response rebuild(
          void Function(AdminTripsGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTripsGet200ResponseBuilder toBuilder() =>
      AdminTripsGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTripsGet200Response &&
        items == other.items &&
        nextCursor == other.nextCursor;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, items.hashCode);
    _$hash = $jc(_$hash, nextCursor.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AdminTripsGet200Response')
          ..add('items', items)
          ..add('nextCursor', nextCursor))
        .toString();
  }
}

class AdminTripsGet200ResponseBuilder
    implements
        Builder<AdminTripsGet200Response, AdminTripsGet200ResponseBuilder> {
  _$AdminTripsGet200Response? _$v;

  ListBuilder<AdminTripsGet200ResponseItemsInner>? _items;
  ListBuilder<AdminTripsGet200ResponseItemsInner> get items =>
      _$this._items ??= ListBuilder<AdminTripsGet200ResponseItemsInner>();
  set items(ListBuilder<AdminTripsGet200ResponseItemsInner>? items) =>
      _$this._items = items;

  String? _nextCursor;
  String? get nextCursor => _$this._nextCursor;
  set nextCursor(String? nextCursor) => _$this._nextCursor = nextCursor;

  AdminTripsGet200ResponseBuilder() {
    AdminTripsGet200Response._defaults(this);
  }

  AdminTripsGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _nextCursor = $v.nextCursor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTripsGet200Response other) {
    _$v = other as _$AdminTripsGet200Response;
  }

  @override
  void update(void Function(AdminTripsGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTripsGet200Response build() => _build();

  _$AdminTripsGet200Response _build() {
    _$AdminTripsGet200Response _$result;
    try {
      _$result = _$v ??
          _$AdminTripsGet200Response._(
            items: _items?.build(),
            nextCursor: nextCursor,
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'items';
        _items?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AdminTripsGet200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
