// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsGet200Response extends PaymentsGet200Response {
  @override
  final BuiltList<PaymentsGet200ResponseItemsInner>? items;
  @override
  final String? nextCursor;

  factory _$PaymentsGet200Response(
          [void Function(PaymentsGet200ResponseBuilder)? updates]) =>
      (PaymentsGet200ResponseBuilder()..update(updates))._build();

  _$PaymentsGet200Response._({this.items, this.nextCursor}) : super._();
  @override
  PaymentsGet200Response rebuild(
          void Function(PaymentsGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsGet200ResponseBuilder toBuilder() =>
      PaymentsGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsGet200Response &&
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
    return (newBuiltValueToStringHelper(r'PaymentsGet200Response')
          ..add('items', items)
          ..add('nextCursor', nextCursor))
        .toString();
  }
}

class PaymentsGet200ResponseBuilder
    implements Builder<PaymentsGet200Response, PaymentsGet200ResponseBuilder> {
  _$PaymentsGet200Response? _$v;

  ListBuilder<PaymentsGet200ResponseItemsInner>? _items;
  ListBuilder<PaymentsGet200ResponseItemsInner> get items =>
      _$this._items ??= ListBuilder<PaymentsGet200ResponseItemsInner>();
  set items(ListBuilder<PaymentsGet200ResponseItemsInner>? items) =>
      _$this._items = items;

  String? _nextCursor;
  String? get nextCursor => _$this._nextCursor;
  set nextCursor(String? nextCursor) => _$this._nextCursor = nextCursor;

  PaymentsGet200ResponseBuilder() {
    PaymentsGet200Response._defaults(this);
  }

  PaymentsGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _items = $v.items?.toBuilder();
      _nextCursor = $v.nextCursor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsGet200Response other) {
    _$v = other as _$PaymentsGet200Response;
  }

  @override
  void update(void Function(PaymentsGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsGet200Response build() => _build();

  _$PaymentsGet200Response _build() {
    _$PaymentsGet200Response _$result;
    try {
      _$result = _$v ??
          _$PaymentsGet200Response._(
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
            r'PaymentsGet200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
