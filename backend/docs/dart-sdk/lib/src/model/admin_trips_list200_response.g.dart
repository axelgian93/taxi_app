// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_trips_list200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTripsList200Response extends AdminTripsList200Response {
  @override
  final BuiltList<AdminTripsList200ResponseItemsInner>? items;
  @override
  final String? nextCursor;

  factory _$AdminTripsList200Response(
          [void Function(AdminTripsList200ResponseBuilder)? updates]) =>
      (AdminTripsList200ResponseBuilder()..update(updates))._build();

  _$AdminTripsList200Response._({this.items, this.nextCursor}) : super._();
  @override
  AdminTripsList200Response rebuild(
          void Function(AdminTripsList200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTripsList200ResponseBuilder toBuilder() =>
      AdminTripsList200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTripsList200Response &&
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
    return (newBuiltValueToStringHelper(r'AdminTripsList200Response')
          ..add('items', items)
          ..add('nextCursor', nextCursor))
        .toString();
  }
}

class AdminTripsList200ResponseBuilder
    implements
        Builder<AdminTripsList200Response, AdminTripsList200ResponseBuilder> {
  _$AdminTripsList200Response? _$v;

  ListBuilder<AdminTripsList200ResponseItemsInner>? _items;
  ListBuilder<AdminTripsList200ResponseItemsInner> get items =>
      _$this._items ??= ListBuilder<AdminTripsList200ResponseItemsInner>();
  set items(ListBuilder<AdminTripsList200ResponseItemsInner>? items) =>
      _$this._items = items;

  String? _nextCursor;
  String? get nextCursor => _$this._nextCursor;
  set nextCursor(String? nextCursor) => _$this._nextCursor = nextCursor;

  AdminTripsList200ResponseBuilder() {
    AdminTripsList200Response._defaults(this);
  }

  AdminTripsList200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _nextCursor = $v.nextCursor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTripsList200Response other) {
    _$v = other as _$AdminTripsList200Response;
  }

  @override
  void update(void Function(AdminTripsList200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTripsList200Response build() => _build();

  _$AdminTripsList200Response _build() {
    _$AdminTripsList200Response _$result;
    try {
      _$result = _$v ??
          _$AdminTripsList200Response._(
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
            r'AdminTripsList200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
